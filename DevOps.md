# DevOps

# Project: genAI-studio

technologies: React, Stable Diffusion, AWS (Amplify, API Gateway, Lambda, S3, SageMaker)

<img src="D:\Notes\web-notes\assets\image-20250214215725846.png" alt="image-20250214215725846"  />

## **流程解析**

1. **用户输入文本**
   - 用户在 **React Web App（前端）** 上输入想要转换为图像的文本（Prompt）。
   - 这个前端应用是 **托管在 AWS Amplify** 上的。
2. **发送文本到后端**
   - React 应用通过 **AWS API Gateway** 将文本请求发送到后端。
3. **调用 AWS Lambda**
   - API Gateway 将文本请求转发到 **AWS Lambda**，这个 Lambda 负责处理文本转换的后端逻辑。
4. **Lambda 发送请求到 SageMaker**
   - Lambda 进一步调用 **Amazon SageMaker**（AWS 的机器学习托管服务），请求 Stable Diffusion AI 模型进行图像推理（Inference）。
   - SageMaker 运行 Stable Diffusion 模型，生成对应的图像数据。
5. **SageMaker 返回推理数据**
   - SageMaker 处理完文本，返回生成的图像数据给 Lambda。
6. **Lambda 将生成的图像存储到 S3**
   - Lambda 负责将 Stable Diffusion 生成的图像上传到 **Amazon S3（对象存储服务）**。
   - S3 生成 **预签名 URL（Pre-Signed URL）**，允许前端安全地访问存储的图像，而无需暴露 S3 的访问权限。
7. **返回图像 URL**
   - Lambda 获取 S3 生成的 **预签名 URL** 并返回给 API Gateway。
   - API Gateway 再将 URL 返回给 React 前端。
8. **前端渲染生成的图像**
   - 前端 React Web App 解析返回的图像 URL，并在页面上渲染生成的图片，用户可以查看或下载。

## **AWS 各组件的作用**

| AWS 服务             | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| **AWS Amplify**      | 托管 React Web App（前端应用）                               |
| **AWS API Gateway**  | 作为 API 网关，连接前端与 Lambda 进行 HTTP 请求处理          |
| **AWS Lambda**       | 无服务器计算服务，负责调用 SageMaker 进行 AI 推理并处理业务逻辑 |
| **Amazon SageMaker** | 运行 Stable Diffusion 模型，接受文本输入并生成图像           |
| **Amazon S3**        | 存储生成的图像文件，并提供 **预签名 URL** 供前端访问         |

## Build Backend

### Step 1: Create SageMaker domain (Amazon SageMaker AI — SageMaker Studio)

1. Create SageMaker Domain 
2. Create a new role in user profile: select "any s3 bucket"

![image-20250214224354811](D:\Notes\web-notes\assets\image-20250214224354811.png)

![image-20250214224934281](D:\Notes\web-notes\assets\image-20250214224934281.png)

### Step 2: Deploy Stable Diffusion model

https://aws.amazon.com/blogs/machine-learning/generate-images-from-text-with-the-stable-diffusion-model-on-amazon-sagemaker-jumpstart/

Find JumpStart and search "Stable Diffusion". Deploy it.

![image-20250215122500801](D:\Notes\web-notes\assets\image-20250215122500801.png)

### Step 3: Test the model 

![image-20250215123418208](D:\Notes\web-notes\assets\image-20250215123418208.png)

or use JupyterLab

![image-20250215124715530](D:\Notes\web-notes\assets\image-20250215124715530.png)

### Step 4: Create a Lambda function that calls the SageMaker runtime invoke_endpoint

#### 1: Create Function

Now we have a SageMaker model endpoint. Let’s look at how we call it from Lambda. We use the SageMaker runtime API action and the Boto3 sagemaker-runtime.invoke_endpoint(). Select Runtime `Python 3.7` (3.9) and use x86_64 architecture.

![image-20250215125447050](D:\Notes\web-notes\assets\image-20250215125447050.png)

#### 2: Add permission

Add below permissions to `AWSLambdaBasicExecutionRole`

Click on the function, find Configuration->Persmissions, click on Role name->Pocily name

![image-20250215125909955](D:\Notes\web-notes\assets\image-20250215125909955.png)

edit it. 

like this:

```json
{
	"Version": "2012-10-17",
	"Statement": [
	    {
	      "Effect": "Allow",
            "Action": [
                "sagemaker:InvokeEndpoint",
                "s3:*"
            ],
            "Resource": "*"  
	    },
		{
			"Effect": "Allow",
			"Action": "logs:CreateLogGroup",
			"Resource": "arn:aws:logs:ap-southeast-2:183631303750:*"
		},
		{
			"Effect": "Allow",
			"Action": [
				"logs:CreateLogStream",
				"logs:PutLogEvents"
			],
			"Resource": [
				"arn:aws:logs:ap-southeast-2:183631303750:log-group:/aws/lambda/StableDifusion:*"
			]
		}
	]
}
```

#### 3: create s3 bucket to save images

create bucket called as `stable-diffusion-percy`

#### 4: create environment variables in lambda

![image-20250216134925098](D:\Notes\web-notes\assets\image-20250216134925098.png)

Copy the Model Name: stable-diffusion-2-1-011604

Then go to Lambda function and add Environment variables

```
Environment variables (2)

The environment variables below are encrypted at rest with the default Lambda service key.
Key

Value
AWS_SM_EP	stable-diffusion-2-1-011604
OUT_S3_BUCKET_NAME	stable-diffusion-percy
```

![image-20250216135307742](D:\Notes\web-notes\assets\image-20250216135307742.png)

#### 5: Then add below code:

```python
import boto3
import io
import json
import numpy as np
import matplotlib.pyplot as plt
import uuid
import os


endpoint_name = os.environ['AWS_SM_EP']
bucket_name = os.environ['OUT_S3_BUCKET_NAME']
s3_client = boto3.client('s3', region_name='ap-southeast-2')
s3 = boto3.resource('s3', region_name='ap-southeast-2')


def query_endpoint(text):
    runtime = boto3.client('runtime.sagemaker')

    encoded_text = json.dumps(text).encode("utf-8")
    response = runtime.invoke_endpoint(
        EndpointName=endpoint_name, ContentType='application/x-text', Body=encoded_text, Accept='application/json')

    return response


def parse_response(query_response):
    response_dict = json.loads(query_response['Body'].read())
    return response_dict['generated_image'], response_dict['prompt']


def upload_image(img, prmpt):
   print('uploading image')
   plt.figure(figsize=(12, 12))
   plt.imshow(np.array(img))
   plt.axis('off')
   plt.title(prmpt)
   # Save image on buffer
   img_data = io.BytesIO()
   plt.savefig(img_data, format='png')
   img_data.seek(0)
   # Upload image to S3
   image_name = prmpt+str(uuid.uuid4())+'.png'
   s3.Object(bucket_name, image_name).put(
       Body=img_data, ContentType='image/png')
   # Return presigned image URL for client to download image
   return s3_client.generate_presigned_url(ClientMethod='get_object', Params={'Bucket': bucket_name, 'Key': image_name}, ExpiresIn=1000)


def lambda_handler(event, context):
    print("Received event: "+json.dumps(event, indent=2))
    data = json.loads(json.dumps(event))
    text = data['data']
    print(text)
    response = query_endpoint(text)
    img, prmpt = parse_response(response)
    # Display hallucinated image
    url = upload_image(img, prmpt)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': url
    }

```

![image-20250216141058438](D:\Notes\web-notes\assets\image-20250216141058438.png)

#### 6: Add below 2 layers in lambda 

1. Add `AWSLambda-Python37-SciPy1x` layer for `numpy`
2. Add `Matplotlib` layer

#### 7: Increase the Timeout for lambda

Go to configuration->General Configuration->Timeout Edit and change to `10min`



### Step 5: Create a REST API: Integration request setup



### Step 6: Test Data via REST API using POSTMAN



## Build Frontend
