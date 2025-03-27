# Flutter

# SetUp

1 准备好git 和 [Visual Studio 2022](https://learn.microsoft.com/visualstudio/install/install-visual-studio?view=vs-2022) to debug and compile native C++ Windows code. Make sure to install the **Desktop development with C++** workload. This enables building Windows app including all of its default components. 



2 Recommended

The Flutter team recommends installing [Visual Studio Code](https://code.visualstudio.com/docs/setup/windows) 1.86 or later and the [Flutter extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter). This combination simplifies installing the Flutter SDK. 或者用 IDEA 安装 flutter 插件，并配置好 flutter 里面的 Dart SDK 路径

Flutter, Dart, 以及更多方便开发的插件



3 从官网下载 Flutter SDK

Warning

Don't install Flutter to a directory or path that meets one or both of the following conditions:

- The path contains special characters or spaces.
- The path requires elevated privileges.

As an example, `C:\Program Files` fails both conditions.

推荐直接下在C盘

**Add SDK to PATH**

搜索env进入环境变量面板, 在用户变量Path里面添加 C:\flutter\flutter_windows_3.29.0-stable\flutter\bin

确认安装

```
flutter doctor
```

解决问题

```
flutter doctor -v
```



4 vscode -> view -> **Command Palette** 或者在搜索栏输入>进入面板

type `flutter`       Select **Flutter: New Project**.

locate the Flutter SDK on your computer

运行 Run -> Run without debugging, 右下角切换运行平台



5 重要：系统启用开发者模式



6 Add Android as a target platform for Flutter from Windows start

(1) Install Android Studio



```
flutter clean
flutter pub get
flutter run
```



# My First Flutter App