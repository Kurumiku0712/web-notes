# LeetCode

# 哈希

## 1. Two Sum

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
};
```

## 49. Group Anagrams

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for (let str of strs) {
        let array = Array.from(str);
        array.sort();
        let key = array.toString();
        let list = map.get(key) ? map.get(key) : new Array();
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};
```

## 128. Longest Consecutive Sequence

```js
var longestConsecutive = function(nums) {
    // sort
    // 1234 100 200
    // for
    // nums[i]+1==nums[i+1]
    // count++
    // Math.max(count)
    let set = new Set(nums)
    let ans=0
    for(let item of set){
        if(!set.has(item-1)){
            let cur=item;
            let count=1;
            while(set.has(cur+1)){
                count++
                cur=cur+1
            }
            ans=Math.max(count,ans)
        }
    }
    return ans;
};
```

# 双指针

## 283. Move Zeroes

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
        //获取数组长度
        let len = nums.length;
        //循环遍历数组
        for(let i =0;i<len;i++){
            //当数组哪个位置是0 ，就删除这个这个位置的元素，然后在末尾补 0
            //从而就达到了 把所有0移动到数组末尾的要求且保持的非零元素的相对顺序
            if(nums[i]==0){
                nums.splice(i,1)
                nums.push(0)
            //当为0的元素删除后，下一个元素就会前进一位占据该位置，所以要从该位置在进行判断
                i--
            //当移动到末尾的元素，就不用再一次进行遍历了，所以遍历的长度要减去1位
                len--
            }
        }
        return nums
}
```

## 11. Container With Most Water

```js
var maxArea = function(height) {
    let ans = 0, left = 0, right = height.length - 1;
    while (left < right) {
        const area = (right - left) * Math.min(height[left], height[right]);
        ans = Math.max(ans, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return ans;
};
```

## 15. 3Sum

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};
```

# 滑动窗口

## 3. Longest Substring Without Repeating Characters

```js
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```

## 483. Find All Anagrams in a String

```js
var findAnagrams = function(s, p) {
    const sLen = s.length, pLen = p.length;

    if (sLen < pLen) {
        return [];
    }

    const ans = [];
    const sCount = new Array(26).fill(0);
    const pCount = new Array(26).fill(0);
    for (let i = 0; i < pLen; ++i) {
        ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
    }

    if (sCount.toString() === pCount.toString()) {
        ans.push(0);
    }

    for (let i = 0; i < sLen - pLen; ++i) {
        --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

        if (sCount.toString() === pCount.toString()) {
            ans.push(i + 1);
        }
    }

    return ans;
};
```

# 子串

## 560. Subarray Sum Equals K

```js
var subarraySum = function(nums, k) {
    const mp = new Map();
    mp.set(0, 1);
    let count = 0, pre = 0;
    for (const x of nums) {
        pre += x;
        if (mp.has(pre - k)) {
            count += mp.get(pre - k);
        }
        if (mp.has(pre)) {
            mp.set(pre, mp.get(pre) + 1);
        } else {
            mp.set(pre, 1);
        }
    }
    return count;
};
```

# 普通数组

## 53. Maximum Subarray

```js
var maxSubArray = function(nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
```

## 56. Merge Intervals

```js
var merge = function(intervals) {
    intervals.sort((p, q) => p[0] - q[0]); // 按照左端点从小到大排序
    const ans = [];
    for (const p of intervals) {
        const m = ans.length;
        if (m && p[0] <= ans[m - 1][1]) { // 可以合并
            ans[m - 1][1] = Math.max(ans[m - 1][1], p[1]); // 更新右端点最大值
        } else { // 不相交，无法合并
            ans.push(p); // 新的合并区间
        }
    }
    return ans;
};
```

## 189. Rotate Array

```js
var rotate = function(nums, k) {
    const n = nums.length;
    const newArr = new Array(n);
    for (let i = 0; i < n; ++i) {
        newArr[(i + k) % n] = nums[i];
    }
    for (let i = 0; i < n; ++i) {
        nums[i] = newArr[i];
    }
};
```

## 238. Product of Array Except Self

```js
var productExceptSelf = function(nums) {
    const n = nums.length;
    const pre = Array(n);
    pre[0] = 1;
    for (let i = 1; i < n; i++) {
        pre[i] = pre[i - 1] * nums[i - 1];
    }

    const suf = Array(n);
    suf[n - 1] = 1;
    for (let i = n - 2; i >= 0; i--) {
        suf[i] = suf[i + 1] * nums[i + 1];
    }

    const ans = Array(n);
    for (let i = 0; i < n; i++) {
        ans[i] = pre[i] * suf[i];
    }
    return ans;
};
```

# 矩阵

## 73. Set Matrix Zeroes

```js
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const row = new Array(m).fill(false);
    const col = new Array(n).fill(false);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                row[i] = col[j] = true;
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (row[i] || col[j]) {
                matrix[i][j] = 0;
            }
        }
    }
};
```

## 54. Spiral Matrix

```js
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }
    const rows = matrix.length, columns = matrix[0].length;
    const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
    const total = rows * columns;
    const order = new Array(total).fill(0);

    let directionIndex = 0, row = 0, column = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (let i = 0; i < total; i++) { 
        order[i] = matrix[row][column];
        visited[row][column] = true;
        const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
        if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
            directionIndex = (directionIndex + 1) % 4;
        }
        row += directions[directionIndex][0];
        column += directions[directionIndex][1];
    }
    return order;
};
```

## 48. Rotate Image

```js
var rotate = function(matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix_new[j][n - i - 1] = matrix[i][j];
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = matrix_new[i][j];
        }
    }
};
```

## 240. Search a 2D Matrix II

```js
var searchMatrix = function(matrix, target) {
    for (const row of matrix) {
        const index = search(row, target);
        if (index >= 0) {
            return true;
        }
    }
    return false;
};

const search = (nums, target) => {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low;
        const num = nums[mid];
        if (num === target) {
            return mid;
        } else if (num > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}
```

# 链表

## 160. Intersection of Two Linked Lists

```js
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
```

## 260. Reverse Linked List

```js
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};
```

## 234. Palindrome Linked List

```js
var isPalindrome = function(head) {
    const vals = [];
    while (head !== null) {
        vals.push(head.val);
        head = head.next;
    }
    for (let i = 0, j = vals.length - 1; i < j; ++i, --j) {
        if (vals[i] !== vals[j]) {
            return false;
        }
    }
    return true;
};
```

## 141. Linked List Cycle

```js
var hasCycle = function(head) {
    let slow = head, fast = head; // 乌龟和兔子同时从起点出发
    while (fast && fast.next) {
        slow = slow.next; // 乌龟走一步
        fast = fast.next.next; // 兔子走两步
        if (fast === slow) { // 兔子追上乌龟（套圈），说明有环
            return true;
        }
    }
    return false; // 访问到了链表末尾，无环
};
```

## 142. Linked List Cycle II

```js
var detectCycle = function(head) {
    const visited = new Set();
    while (head !== null) {
        if (visited.has(head)) {
            return head;
        }
        visited.add(head);
        head = head.next;
    }
    return null;
};
```

## 21. Merge Two Sorted Lists

```js
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
```

## 2. Add Two Numbers

```js
var addTwoNumbers = function(l1, l2) {
    let head = null, tail = null;
    let carry = 0;
    while (l1 || l2) {
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        const sum = n1 + n2 + carry;
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        carry = Math.floor(sum / 10);
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    return head;
};
```

## 19. Remove Nth Node From End of List

```js
var removeNthFromEnd = function(head, n) {
    // 由于可能会删除链表头部，用哨兵节点简化代码
    const dummy = new ListNode(0, head);
    let left = dummy;
    let right = dummy;
    while (n--) {
        right = right.next; // 右指针先向右走 n 步
    }
    while (right.next) {
        left = left.next;
        right = right.next; // 左右指针一起走
    }
    left.next = left.next.next; // 左指针的下一个节点就是倒数第 n 个节点
    return dummy.next;
};
```

## 24. Swap Nodes in Pairs

```js
var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};
```

## 138. Copy List with Random Pointer

```js
var copyRandomList = function(head, cachedNode = new Map()) {
    if (head === null) {
        return null;
    }
    if (!cachedNode.has(head)) {
        cachedNode.set(head, {val: head.val}), Object.assign(cachedNode.get(head), {next: copyRandomList(head.next, cachedNode), random: copyRandomList(head.random, cachedNode)})
    }
    return cachedNode.get(head);
}
```

## 148. Sort List

```js
const merge = (head1, head2) => {
    const dummyHead = new ListNode(0);
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
}

const toSortList = (head, tail) => {
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
}

var sortList = function(head) {
    return toSortList(head, null);
};
```

## 146. LRU Cache

```js
class Node {
    constructor(key = 0, value = 0) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.dummy = new Node(); // 哨兵节点
        this.dummy.prev = this.dummy;
        this.dummy.next = this.dummy;
        this.keyToNode = new Map();
    }

    // 获取 key 对应的节点，同时把该节点移到链表头部
    #getNode(key) {
        if (!this.keyToNode.has(key)) { // 没有这本书
            return null;
        }
        const node = this.keyToNode.get(key); // 有这本书
        this.#remove(node); // 把这本书抽出来
        this.#pushFront(node); // 放在最上面
        return node;
    }

    get(key) {
        const node = this.#getNode(key); // getNode 会把对应节点移到链表头部
        return node ? node.value : -1;
    }

    put(key, value) {
        let node = this.#getNode(key);
        if (node) { // 有这本书
            node.value = value; // 更新 value
            return;
        }
        node = new Node(key, value) // 新书
        this.keyToNode.set(key, node);
        this.#pushFront(node); // 放在最上面
        if (this.keyToNode.size > this.capacity) { // 书太多了
            const backNode = this.dummy.prev;
            this.keyToNode.delete(backNode.key);
            this.#remove(backNode); // 去掉最后一本书
        }
    }

    // 删除一个节点（抽出一本书）
    #remove(x) {
        x.prev.next = x.next;
        x.next.prev = x.prev;
    }

    // 在链表头添加一个节点（把一本书放在最上面）
    #pushFront(x) {
        x.prev = this.dummy;
        x.next = this.dummy.next;
        x.prev.next = x;
        x.next.prev = x;
    }
}
```

# 二叉树

## 94. Binary Tree Inorder Traversal

```js
var inorderTraversal = function(root) {
    const res = [];
    const inorder = (root) => {
        if (!root) {
            return;
        }
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};
```

## 104. Maximum Depth of Binary Tree

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root) {
        return 0;
    } else {
        const left = maxDepth(root.left);
        const right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
};
```

## 226. Invert Binary Tree

```js
var invertTree = function(root) {
    if (root === null) {
        return null;
    }
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
```

## 101. Symmetric Tree

```js
var isSymmetric = function(root) {
    // 在【100. 相同的树】的基础上稍加改动
    function isSameTree(p, q) {
        if (p === null || q === null) {
            return p === q;
        }
        return p.val === q.val && isSameTree(p.left, q.right) && isSameTree(p.right, q.left);
    }
    return isSameTree(root.left, root.right);
};
```

## 543. Diameter of Binary Tree

```js
var diameterOfBinaryTree = function(root) {
    // 默认为1是因为默认了根节点自身的路径长度
    let ans = 1;

    function depth(rootNode) {
        if (!rootNode) {
            // 如果不存在根节点，则深度为0
            return 0;
        }
        // 递归，获取左子树的深度
        let L = depth(rootNode.left);
        // 递归，获取右子树的深度
        let R = depth(rootNode.right);

        /* 关键点1
        L+R+1的公式是如何而来？
        等同于：左子树深度(节点个数) + 右子树深度（节点个数） + 1个根节点
        便是这株二叉树从最左侧叶子节点到最右侧叶子节点的最长路径
        类似于平衡二叉树的最小值节点到最大值节点的最长路径
        之所以+1是因为需要经过根节点
         */
        // 获取该树的最长路径和现有最长路径中最大的那个
        ans = Math.max(ans, L + R + 1);
        /* 关键点2
        已知根节点的左右子树的深度，
        则，左右子树深度的最大值 + 1，
        便是以根节点为数的最大深度*/
        return Math.max(L, R) + 1;
    }

    depth(root);

    // 由于depth函数中已经默认加上数节点的自身根节点路径了，故此处需减1
    return ans - 1;
}; 
```

## 102. Binary Tree Level Order Traversal

```js
var levelOrder = function(root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);
    while (q.length !== 0) {
        const currentLevelSize = q.length;
        ret.push([]);
        for (let i = 1; i <= currentLevelSize; ++i) {
            const node = q.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
        
    return ret;
};
```

## 108. Convert Sorted Array to Binary Search Tree

```js
var sortedArrayToBST = function(nums) {
    // 把 nums[left] 到 nums[right-1] 转成平衡二叉搜索树
    function dfs(left, right) {
        if (left === right) {
            return null;
        }
        const m = Math.floor((left + right) / 2);
        return new TreeNode(nums[m], dfs(left, m), dfs(m + 1, right));
    }
    return dfs(0, nums.length);
};
```

## 98. Validate Binary Search Tree

```js
const helper = (root, lower, upper) => {
    if (root === null) {
        return true;
    }
    if (root.val <= lower || root.val >= upper) {
        return false;
    }
    return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
}
var isValidBST = function(root) {
    return helper(root, -Infinity, Infinity);
};
```

## 230. Kth Smallest Element in a BST

```js
var kthSmallest = function(root, k) {
    const stack = [];
    while (root != null || stack.length) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        --k;
        if (k === 0) {
            break;
        }
        root = root.right;
    }
    return root.val;
};
```

## 199. Binary Tree Right Side View

```js
var rightSideView = function(root) {
    const ans = [];
    function dfs(node, depth) {
        if (node === null) {
            return;
        }
        if (depth === ans.length) { // 这个深度首次遇到
            ans.push(node.val);
        }
        dfs(node.right, depth + 1); // 先递归右子树，保证首次遇到的一定是最右边的节点
        dfs(node.left, depth + 1);
    }
    dfs(root, 0);
    return ans;
};
```

## 114. Flatten Binary Tree to Linked List

```js
var flatten = function(root) {
    const list = [];
    preorderTraversal(root, list);
    const size = list.length;
    for (let i = 1; i < size; i++) {
        const prev = list[i - 1], curr = list[i];
        prev.left = null;
        prev.right = curr;
    }
};

const preorderTraversal = (root, list) => {
    if (root != null) {
        list.push(root);
        preorderTraversal(root.left, list);
        preorderTraversal(root.right, list);
    }
}
```

## 105. Construct Binary Tree from Preorder and Inorder Traversal

```js
var buildTree = function(preorder, inorder) {
    const n = preorder.length;
    if (n === 0) { // 空节点
        return null;
    }
    const leftSize = inorder.indexOf(preorder[0]); // 左子树的大小
    const pre1 = preorder.slice(1, 1 + leftSize);
    const pre2 = preorder.slice(1 + leftSize);
    const in1 = inorder.slice(0, leftSize);
    const in2 = inorder.slice(1 + leftSize, n);
    const left = buildTree(pre1, in1);
    const right = buildTree(pre2, in2);
    return new TreeNode(preorder[0], left, right);
};
```

## 437. Path Sum III

```js
var pathSum = function(root, targetSum) {
    if (root == null) {
        return 0;
    }
    
    let ret = rootSum(root, targetSum);
    ret += pathSum(root.left, targetSum);
    ret += pathSum(root.right, targetSum);
    return ret;
};

const rootSum = (root, targetSum) => {
    let ret = 0;

    if (root == null) {
        return 0;
    }
    const val = root.val;
    if (val === targetSum) {
        ret++;
    } 

    ret += rootSum(root.left, targetSum - val);
    ret += rootSum(root.right, targetSum - val);
    return ret;
}
```

## 236. Lowest Common Ancestor of a Binary Tree

```js
var lowestCommonAncestor = function(root, p, q) {
    let ans;
    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
            ans = root;
        } 
        return lson || rson || (root.val === p.val || root.val === q.val);
    }
    dfs(root, p, q);
    return ans;
};
```

# 图论

## 200.Number of Islands

```js
var numIslands = function(grid) {
    const m = grid.length, n = grid[0].length;
    function dfs(i, j) {
        // 出界，或者不是 '1'，就不再往下递归
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== '1') {
            return;
        }
        grid[i][j] = '2'; // 插旗！避免来回横跳无限递归
        dfs(i, j - 1); // 往左走
        dfs(i, j + 1); // 往右走
        dfs(i - 1, j); // 往上走
        dfs(i + 1, j); // 往下走
    }

    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') { // 找到了一个新的岛
                dfs(i, j); // 把这个岛插满旗子，这样后面遍历到的 '1' 一定是新的岛
                ans++;
            }
        }
    }
    return ans;
};
```

## 994. Rotting Oranges

```js
var orangesRotting = function(grid) {
    const R = grid.length, C = grid[0].length;
    const dr = [-1, 0, 1, 0];
    const dc = [0, -1, 0, 1];
    const queue = [];
    const depth = new Map();
    
    for (let r = 0; r < R; ++r) {
        for (let c = 0; c < C; ++c) {
            if (grid[r][c] === 2) {
                const code = r * C + c;
                queue.push(code);
                depth.set(code, 0);
            }
        }
    }
    
    let ans = 0;
    while (queue.length !== 0) {
        const code = queue.shift();
        const r = Math.floor(code / C), c = code % C;
        for (let k = 0; k < 4; ++k) {
            const nr = r + dr[k];
            const nc = c + dc[k];
            if (0 <= nr && nr < R && 0 <= nc && nc < C && grid[nr][nc] === 1) {
                grid[nr][nc] = 2;
                const ncode = nr * C + nc;
                queue.push(ncode);
                depth.set(ncode, depth.get(code) + 1);
                ans = depth.get(ncode);
            }
        }
    }
    
    const freshOrangesCount = grid.reduce((acc, row) => acc + row.reduce((acc, v) => acc + (v === 1 ? 1 : 0), 0), 0);
    return freshOrangesCount > 0 ? -1 : ans;
};
```

## 207. Course Schedule

```js
const canFinish = (numCourses, prerequisites) => {
  const inDegree = new Array(numCourses).fill(0); // 入度数组
  const map = {};                                 // 邻接表
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;              // 求课的初始入度值
    if (map[prerequisites[i][1]]) {               // 当前课已经存在于邻接表
      map[prerequisites[i][1]].push(prerequisites[i][0]); // 添加依赖它的后续课
    } else {                                      // 当前课不存在于邻接表
      map[prerequisites[i][1]] = [prerequisites[i][0]];
    }
  }
  const queue = [];
  for (let i = 0; i < inDegree.length; i++) { // 所有入度为0的课入列
    if (inDegree[i] == 0) queue.push(i);
  }
  let count = 0;
  while (queue.length) {
    const selected = queue.shift();           // 当前选的课，出列
    count++;                                  // 选课数+1
    const toEnQueue = map[selected];          // 获取这门课对应的后续课
    if (toEnQueue && toEnQueue.length) {      // 确实有后续课
      for (let i = 0; i < toEnQueue.length; i++) {
        inDegree[toEnQueue[i]]--;             // 依赖它的后续课的入度-1
        if (inDegree[toEnQueue[i]] == 0) {    // 如果因此减为0，入列
          queue.push(toEnQueue[i]);
        }
      }
    }
  }
  return count == numCourses; // 选了的课等于总课数，true，否则false
};
```

## 208. Implement Trie (Prefix Tree)

```js
var Trie = function() {
    this.children = {};
};

Trie.prototype.insert = function(word) {
    let node = this.children;
    for (const ch of word) {
        if (!node[ch]) {
            node[ch] = {};
        }
        node = node[ch];
    }
    node.isEnd = true;
};

Trie.prototype.searchPrefix = function(prefix) {
    let node = this.children;
    for (const ch of prefix) {
        if (!node[ch]) {
            return false;
        }
        node = node[ch];
    }
    return node;
}

Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
};

Trie.prototype.startsWith = function(prefix) {
    return this.searchPrefix(prefix);
};
```

# 回溯

## 46. Permutations

```js

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [], path = [];
    backtracking(nums, nums.length, []);
    return res;
    
    function backtracking(n, k, used) {
        if(path.length === k) {
            res.push(Array.from(path));
            return;
        }
        for (let i = 0; i < k; i++ ) {
            if(used[i]) continue;
            path.push(n[i]);
            used[i] = true; // 同支
            backtracking(n, k, used);
            path.pop();
            used[i] = false;
        }
    }
};
```

## 78. Subsets

```js
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;
    for (let mask = 0; mask < (1 << n); ++mask) {
        const t = [];
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
};
```

## 17. Letter Combinations of a Phone Number

```js
var letterCombinations = function(digits) {
    const k = digits.length;
    const map = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];
    if(!k) return [];
    if(k === 1) return map[digits].split("");

    const res = [], path = [];
    backtracking(digits, k, 0);
    return res;

    function backtracking(n, k, a) {
        if(path.length === k) {
            res.push(path.join(""));
            return;
        }
        for(const v of map[n[a]]) {
            path.push(v);
            backtracking(n, k, a + 1);
            path.pop();
        }
    }
};
```

## 39. Combination Sum

```js
var combinationSum = function(candidates, target) {
    const ans = [];
    const dfs = (target, combine, idx) => {
        if (idx === candidates.length) {
            return;
        }
        if (target === 0) {
            ans.push(combine);
            return;
        }
        // 直接跳过
        dfs(target, combine, idx + 1);
        // 选择当前数
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
        }
    }

    dfs(target, [], 0);
    return ans;
};
```

## 22. Generate Parentheses

```js
var generateParenthesis = function(n) {
    const m = n * 2;
    const ans = [];
    const path = Array(m);
    // i = 目前填了多少个括号
    // open = 左括号个数，i-open = 右括号个数
    function dfs(i, open) {
        if (i === n * 2) {
            ans.push(path.join(""));
            return;
        }
        if (open < n) { // 可以填左括号
            path[i] = '(';
            dfs(i + 1, open + 1);
        }
        if (i - open < open) { // 可以填右括号
            path[i] = ')';
            dfs(i + 1, open);
        }
    }
    dfs(0, 0);
    return ans;
};
```

## 79. Word Search

```js
var exist = function(board, word) {
    const m = board.length, n = board[0].length;
    function dfs(i, j, k) {
        if (board[i][j] !== word[k]) {
            return false; // 匹配失败
        }
        if (k + 1 === word.length) {
            return true; // 匹配成功！
        }
        board[i][j] = 0; // 标记访问过
        for (const [x, y] of [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]]) { // 相邻格子
            if (0 <= x && x < m && 0 <= y && y < n && dfs(x, y, k + 1)) {
                return true; // 搜到了！
            }
        }
        board[i][j] = word[k]; // 恢复现场
        return false; // 没搜到
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) {
                return true; // 搜到了！
            }
        }
    }
    return false; // 没搜到
};
```

## 131. Palindrome Partitioning

```js
var partition = function(s) {
    const dfs = (i) => {
        if (i === n) {
            ret.push(ans.slice());
            return;
        }
        for (let j = i; j < n; ++j) {
            if (f[i][j]) {
                ans.push(s.slice(i, j + 1));
                dfs(j + 1);
                ans.pop();
            }
        }
    }
    
    const n = s.length;
    const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
    let ret = [], ans = [];
    
    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
        }
    }
    dfs(0);
    return ret;
};
```

# 二分查找

## 35. Search Insert Position

```js
var searchInsert = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left <= right) {
        let mid = ((right - left) >> 1) + left;
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};
```

## 74. Search a 2D Matrix

```js
var searchMatrix = function(matrix, target) {
    const rowIndex = binarySearchFirstColumn(matrix, target);
    if (rowIndex < 0) {
        return false;
    }
    return binarySearchRow(matrix[rowIndex], target);
};

const binarySearchFirstColumn = (matrix, target) => {
    let low = -1, high = matrix.length - 1;
    while (low < high) {
        const mid = Math.floor((high - low + 1) / 2) + low;
        if (matrix[mid][0] <= target) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    return low;
}

const binarySearchRow = (row, target) => {
    let low = 0, high = row.length - 1;
    while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low;
        if (row[mid] == target) {
            return true;
        } else if (row[mid] > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return false;
}
```

## 34. Find First and Last Position of Element in Sorted Array

```js
const binarySearch = (nums, target, lower) => {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

var searchRange = function(nums, target) {
    let ans = [-1, -1];
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    } 
    return ans;
};
```

## 33. Search in Rotated Sorted Array

```js
// 153. 寻找旋转排序数组中的最小值（返回的是下标）
var findMin = function(nums) {
    let left = -1, right = nums.length - 1; // 开区间 (-1, n-1)
    while (left + 1 < right) { // 开区间不为空
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] < nums[nums.length - 1]) {
            right = mid;
        } else {
            left = mid;
        }
    }
    return right;
};

// 有序数组中找 target 的下标
var lowerBound = function(nums, left, right, target) {
    while (left + 1 < right) { // 开区间不为空
        // 循环不变量：
        // nums[right] >= target
        // nums[left] < target
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            right = mid; // 范围缩小到 (left, mid)
        } else {
            left = mid; // 范围缩小到 (mid, right)
        }
    }
    return nums[right] === target ? right : -1;
};

var search = function(nums, target) {
    const i = findMin(nums);
    if (target > nums[nums.length - 1]) { // target 在第一段
        return lowerBound(nums, -1, i, target); // 开区间 (-1, i)
    }
    // target 在第二段
    return lowerBound(nums, i - 1, nums.length, target); // 开区间 (i-1, n)
};
```

## 153. Find Minimum in Rotated Sorted Array

```js
var findMin = function(nums) {
    let low = 0;
    let high = nums.length - 1;
    while (low < high) {
        const pivot = low + Math.floor((high - low) / 2);
        if (nums[pivot] < nums[high]) {
            high = pivot;
        } else {
            low = pivot + 1;
        }
    }
    return nums[low];
};
```

# 栈

## 20. Valid Parentheses

```js
var isValid = function(s) {
    const n = s.length;
    if (n % 2 === 1) {
        return false;
    }
    const pairs = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ]);
    const stk = [];
    for (let ch of s){
        if (pairs.has(ch)) {
            if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
                return false;
            }
            stk.pop();
        } 
        else {
            stk.push(ch);
        }
    };
    return !stk.length;
};
```

## 155. Min Stack

```js
var MinStack = function() {
    this.x_stack = [];
    this.min_stack = [Infinity];
};

MinStack.prototype.push = function(x) {
    this.x_stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function() {
    this.x_stack.pop();
    this.min_stack.pop();
};

MinStack.prototype.top = function() {
    return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};
```

## 394. Decode String

```js
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    let numStack = []; // 栈：存储倍数
    let strStack = []; // 栈：存储已解析的字符串
    let currentNum = 0; // 记录当前的倍数
    let currentStr = ""; // 记录当前的解析字符串

    for (let char of s) {
        if (!isNaN(char)) {  
            // 处理多位数字，如 "10[abc]"
            currentNum = currentNum * 10 + Number(char);
        } else if (char === "[") {
            // 遇到 '['，将当前倍数和字符串入栈
            numStack.push(currentNum);
            strStack.push(currentStr);
            // 进入新解析阶段，重置变量
            currentNum = 0;
            currentStr = "";
        } else if (char === "]") {
            // 结束一个编码块，出栈计算结果
            let repeatTimes = numStack.pop(); // 取出对应的倍数
            let decodedStr = currentStr.repeat(repeatTimes); // 生成重复的字符串
            currentStr = strStack.pop() + decodedStr; // 拼接到之前的字符串
        } else {
            // 普通字符，追加到当前字符串
            currentStr += char;
        }
    }
    
    return currentStr;
};
```

## 739. Daily Temperatures

```js
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const ans = Array(n).fill(0);
    const st = [];
    for (let i = n - 1; i >= 0; i--) {
        const t = temperatures[i];
        while (st.length && t >= temperatures[st[st.length - 1]]) {
            st.pop();
        }
        if (st.length) {
            ans[i] = st[st.length - 1] - i;
        }
        st.push(i);
    }
    return ans;
};
```

# 堆

## 215. Kth Largest Element in an Array

```js
class MinHeap {
    constructor() {
        this.heap = [];
    }

    buildHeap(arr) {
        // 从上至下构建
        this.heap = [];
        for(let i = 0; i < arr.length; i++){
            this.insert(arr[i])
        }

        // 从下至上构建
        // this.heap = [...arr];
        // let lastNonLeafIndex = Math.floor((this.heap.length - 2) / 2); // 之前提到的性质
        // for (let i = lastNonLeafIndex; i >= 0; i--) { 
        //     this.#siftDown(i);
        // }
    }

    #siftDown(index) {
        let leftIndex = index * 2 + 1;  // 左子节点索引
        let rightIndex = index * 2 + 2; // 右子节点索引
        let swapIndex = index; // 需要交换的索引，初始为当前节点

        // 如果左子节点存在且比当前节点小，则更新swapIndex
        if (leftIndex < this.heap.length && this.heap[leftIndex] < this.heap[swapIndex]) {
            swapIndex = leftIndex;
        }

        // 如果右子节点存在且比当前最小的子节点还小，则更新swapIndex
        if (rightIndex < this.heap.length && this.heap[rightIndex] < this.heap[swapIndex]) {
            swapIndex = rightIndex;
        }

        // 如果需要交换，执行交换并递归下沉
        if (swapIndex !== index) {
            this.#swap(swapIndex, index);
            this.#siftDown(swapIndex);
        }
    }

    #siftUp(index) {
        let parentIndex = Math.floor((index - 1) / 2); // 父节点索引
        let swapIndex = index; // 需要交换的索引，初始为当前节点

        // 如果父节点存在且比当前节点大，则更新swapIndex
        if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
            swapIndex = parentIndex;
        }

        // 如果需要交换，执行交换并递归上浮
        if (swapIndex !== index) {
            this.#swap(swapIndex, index);
            this.#siftUp(swapIndex);
        }
    }

    #swap(i, j) {
        let tmp = this.heap[j];
        this.heap[j] = this.heap[i];
        this.heap[i] = tmp;
    }

    pop() {
        if (this.heap.length === 0) return null;  // 边界情况检查
        let val = this.heap[0];
        let n = this.heap.length;

        // 将根节点与最后一个元素交换并移除最后一个元素，然后下沉
        this.#swap(0, n - 1);
        this.heap.length = n - 1;  // 直接修改长度，避免使用slice

        this.#siftDown(0);
        return val;
    }

    insert(val) {
        this.heap.push(val);
        this.#siftUp(this.heap.length - 1);
    }
};

var findKthLargest = function(nums, k) {
    let h = new MinHeap();
    h.buildHeap(nums);

    // 弹出 `nums.length - k` 个元素以得到第k大的元素
    for (let i = 0; i < nums.length - k; i++) {
        h.pop();  // 移除最小的元素
    }

    return h.pop();  // 堆顶现在是第k大的元素
};
```

## 347. Top K Frequent Elements

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  const map = new Map();
  
  for(const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  // 创建小顶堆
  const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1]);

  // entry 是一个长度为2的数组，0位置存储key，1位置存储value
  for (const entry of map.entries()) {
    priorityQueue.push(entry);
    if (priorityQueue.size() > k) {
      priorityQueue.pop();
    }
  }

  const ret = [];

  for(let i = priorityQueue.size() - 1; i >= 0; i--) {
    ret[i] = priorityQueue.pop()[0];
  }

  return ret;
};


function PriorityQueue(compareFn) {
  this.compareFn = compareFn;
  this.queue = [];
}

// 添加
PriorityQueue.prototype.push = function(item) {
  this.queue.push(item);
  let index = this.queue.length - 1;
  let parent = Math.floor((index - 1) / 2);
  // 上浮
  while(parent >= 0 && this.compare(parent, index) > 0) {
    // 交换
    [this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]];
    index = parent;
    parent = Math.floor((index - 1) / 2);
  }
}

// 获取堆顶元素并移除
PriorityQueue.prototype.pop = function() {
  const ret = this.queue[0];

  // 把最后一个节点移到堆顶
  this.queue[0] = this.queue.pop();

  let index = 0;
  // 左子节点下标，left + 1 就是右子节点下标
  let left = 1;
  let selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;

  // 下沉
  while(selectedChild !== undefined && this.compare(index, selectedChild) > 0) {
    // 交换
    [this.queue[index], this.queue[selectedChild]] = [this.queue[selectedChild], this.queue[index]];
    index = selectedChild;
    left = 2 * index + 1;
    selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
  }

  return ret;
}

PriorityQueue.prototype.size = function() {
  return this.queue.length;
}

// 使用传入的 compareFn 比较两个位置的元素
PriorityQueue.prototype.compare = function(index1, index2) {
  if (this.queue[index1] === undefined) {
    return 1;
  }
  if (this.queue[index2] === undefined) {
    return -1;
  }

  return this.compareFn(this.queue[index1], this.queue[index2]);
}
```

# 贪心算法

## 121. Best Time to Buy and Sell Stock

```js
var maxProfit = function(prices) {
    let ans = 0;
    let minPrice = prices[0];
    for (const p of prices) {
        ans = Math.max(ans, p - minPrice);
        minPrice = Math.min(minPrice, p);
    }
    return ans;
};
```

## 55. Jump Game

```js
var canJump = function(nums) {
    let mx = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > mx) { // 无法到达 i
            return false;
        }
        mx = Math.max(mx, i + nums[i]); // 从 i 最右可以跳到 i + nums[i]
    }
    return true;
};
```

## 45. Jump Game II

```js
var jump = function(nums) {
    let position = nums.length - 1;
    let steps = 0;
    while (position > 0) {
        for (let i = 0; i < position; i++) {
            if (i + nums[i] >= position) {
                position = i;
                steps++;
                break;
            }
        }
    }
    return steps;
};
```

## 763. Partition Labels

```js
var partitionLabels = function(s) {
    const last = new Array(26);
    const length = s.length;
    const codePointA = 'a'.codePointAt(0);
    for (let i = 0; i < length; i++) {
        last[s.codePointAt(i) - codePointA] = i;
    }
    const partition = [];
    let start = 0, end = 0;
    for (let i = 0; i < length; i++) {
        end = Math.max(end, last[s.codePointAt(i) - codePointA]);
        if (i == end) {
            partition.push(end - start + 1);
            start = end + 1;
        }
    }
    return partition;
};
```

# 动态规划

## 70. Climbing Stairs

```js
var climbStairs = function(n) {
    let p = 0, q = 0, r = 1;
    for (let i = 1; i <= n; ++i) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
};
```

## 118. Pascal's Triangle

```js
var generate = function(numRows) {
    const ret = [];

    for (let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1);
        for (let j = 1; j < row.length - 1; j++) {
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }
        ret.push(row);
    }
    return ret;
};
```

## 198. House Robber

```js
var rob = function(nums) {
    const n = nums.length;
    const memo = Array(n).fill(-1); // -1 表示没有计算过
    // dfs(i) 表示从 nums[0] 到 nums[i] 最多能偷多少
    function dfs(i) {
        if (i < 0) { // 递归边界（没有房子）
            return 0;
        }
        if (memo[i] !== -1) { // 之前计算过
            return memo[i];
        }
        const res = Math.max(dfs(i - 1), dfs(i - 2) + nums[i]);
        memo[i] = res; // 记忆化：保存计算结果
        return res;
    }
    return dfs(n - 1); // 从最后一个房子开始思考
};
```

## 279. Perfect Squares

```js
var numSquares = function(n) {
    const f = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let minn = Number.MAX_VALUE;
        for (let j = 1; j * j <= i; j++) {
            minn = Math.min(minn, f[i - j * j]);
        }
        f[i] = minn + 1;
    }
    return f[n];
};
```

## 322. Coin Change

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const m = coins.length;
    const n = amount;
    const f = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(1 << 30));
    f[0][0] = 0;
    for (let i = 1; i <= m; ++i) {
        for (let j = 0; j <= n; ++j) {
            f[i][j] = f[i - 1][j];
            if (j >= coins[i - 1]) {
                f[i][j] = Math.min(f[i][j], f[i][j - coins[i - 1]] + 1);
            }
        }
    }
    return f[m][n] > n ? -1 : f[m][n];
};
```

## 139. Word Break

```js
var wordBreak = function(s, wordDict) {
    const maxLen = Math.max(...wordDict.map(word => word.length));
    const words = new Set(wordDict);
    const memo = Array(s.length + 1);

    function dfs(i) {
        if (i === 0) { // 成功拆分！
            return true;
        }
        if (memo[i] !== undefined) { // 之前计算过
            return memo[i];
        }
        for (let j = i - 1; j >= Math.max(i - maxLen, 0); j--) {
            if (words.has(s.slice(j, i)) && dfs(j)) {
                return memo[i] = true; // 记忆化
            }
        }
        return memo[i] = false; // 记忆化
    }

    return dfs(s.length);
};
```

## 300. Longest Increasing Subsequence

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {

  // 每堆的堆顶
  const top = [];
  // 牌堆数初始化为0
  let piles = 0;
  for (let i = 0; i < nums.length; i++) {
    // 要处理的扑克牌
    let poker = nums[i];
    // 左堆和最右堆进行二分搜索，因为堆顶是有序排的，最终找到该牌要插入的堆
    let left = 0,
      right = piles;
    //搜索区间是左闭右开
    while (left < right) {
      let mid = left + ((right - left) >> 1);
      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    //  没找到合适的牌堆，新建一堆
    if (left == piles) piles++;
    // 把这张牌放到堆顶
    top[left] = poker;
  }
  return piles;
};
```

## 152. Maximum Product Subarray

```js
var maxProduct = function(nums) {
    const n = nums.length;
    const fMax = new Array(n);
    const fMin = new Array(n);
    fMax[0] = fMin[0] = nums[0];
    for (let i = 1; i < n; i++) {
        const x = nums[i];
        // 把 x 加到右端点为 i-1 的（乘积最大/最小）子数组后面，
        // 或者单独组成一个子数组，只有 x 一个元素
        fMax[i] = Math.max(fMax[i - 1] * x, fMin[i - 1] * x, x);
        fMin[i] = Math.min(fMax[i - 1] * x, fMin[i - 1] * x, x);
    }
    return Math.max(...fMax);
};
```

## 416. Partition Equal Subset Sum

```js
var canPartition = function(nums) {
    const n = nums.length;
    if (n < 2) {
        return false;
    }
    let sum = 0, maxNum = 0;
    for (const num of nums) {
        sum += num;
        maxNum = maxNum > num ? maxNum : num;
    }
    if (sum & 1) {
        return false;
    }
    const target = Math.floor(sum / 2);
    if (maxNum > target) {
        return false;
    }
    const dp = new Array(n).fill(0).map(() => new Array(target + 1, false));
    for (let i = 0; i < n; i++) {
        dp[i][0] = true;
    }
    dp[0][nums[0]] = true;
    for (let i = 1; i < n; i++) {
        const num = nums[i];
        for (let j = 1; j <= target; j++) {
            if (j >= num) {
                dp[i][j] = dp[i - 1][j] | dp[i - 1][j - num];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[n - 1][target];
};
```

# 多维动态规划

## 62. Unique Paths

```js
var uniquePaths = function(m, n) {
    const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        f[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        f[0][j] = 1;
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            f[i][j] = f[i - 1][j] + f[i][j - 1];
        }
    }
    return f[m - 1][n - 1];
};
```

## 64. Minimum Path Sum

```js
const dirs = [[1, 0], [0, 1]]

// 3. 记忆化搜索
var minPathSum1 = function(grid) {
    const MAX_INT = Math.pow(2, 31) - 1
    const m = grid.length, n = grid[0].length
    const memo = new Array(m).fill(0).map(() => new Array(n).fill(MAX_INT))

    const dfs = (row, col) => {
        if (row == m - 1 && col == n - 1) return grid[row][col]

        if (memo[row][col] != MAX_INT) return memo[row][col]

        let minPathSum = MAX_INT
        for (const dir of dirs) {
            const nextRow = row + dir[0]
            const nextCol = col + dir[1]
            if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) continue
            const childMinPathSum = dfs(nextRow, nextCol)
            minPathSum = Math.min(minPathSum, childMinPathSum)
        }

        memo[row][col] = minPathSum + grid[row][col]
        return memo[row][col]
    }

    return dfs(0, 0)
};
```

## 5. Longest Palindromic Substring

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
        if (s.length<2){
            return s
        }
        let res = ''
        for (let i = 0; i < s.length; i++) {
            // 回文子串长度是奇数
            helper(i, i)
            // 回文子串长度是偶数
            helper(i, i + 1) 
        }

        function helper(m, n) {
            while (m >= 0 && n < s.length && s[m] == s[n]) {
                m--
                n++
            }
            // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
            // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
            if (n - m - 1 > res.length) {
                // slice也要取[m+1,n-1]这个区间 
                res = s.slice(m + 1, n)
            }
        }
        return res
};
```

## 1143. Longest Common Subsequence

```js
var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        const c1 = text1[i - 1];
        for (let j = 1; j <= n; j++) {
            const c2 = text2[j - 1];
            if (c1 === c2) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
};
```

## 72. Edit Distance

```js
const minDistance = (word1, word2) => {
    let dp = Array.from(Array(word1.length + 1), () => Array(word2.length+1).fill(0));

    for(let i = 1; i <= word1.length; i++) {
        dp[i][0] = i; 
    }

    for(let j = 1; j <= word2.length; j++) {
        dp[0][j] = j;
    }

    for(let i = 1; i <= word1.length; i++) {
        for(let j = 1; j <= word2.length; j++) {
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1);
            }
        }
    }
    
    return dp[word1.length][word2.length];
};
```

# 技巧

## 136. Single Number

```js
var singleNumber = function(nums) {
    let ans = 0;
    for (const x of nums) {
        ans ^= x;
    }
    return ans;
};
```

## 169. Majority Element

```js
var majorityElement = function (nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    const map = new Map();
    for (let num of nums) {
        if (!map.get(num)) {
            map.set(num, 1);
        } else {
            map.set(num, map.get(num) + 1);
            if (map.get(num) > nums.length / 2) {
                return num;
            }
        }
    }
};
```

## 75. Sort Colors

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let zero = 0; // `zero` 指针，表示 0 的右边界
    let two = nums.length - 1; // `two` 指针，表示 2 的左边界
    let i = 0; // `i` 为当前遍历指针

    while (i <= two) { // 遍历数组，直到 `i` 超过 `two`
        if (nums[i] === 0) {
            // 0 交换 `nums[i]` 和 `nums[zero]`，然后 `zero++` 和 `i++`
            [nums[i], nums[zero]] = [nums[zero], nums[i]];
            zero++;
            i++;
        } else if (nums[i] === 1) {
            // 1 位置正确，直接 `i++`
            i++;
        } else {
            // 2 交换 `nums[i]` 和 `nums[two]`，然后 `two--`（但 `i` 不变）
            [nums[i], nums[two]] = [nums[two], nums[i]];
            two--;
        }
    }
};
```

## 31. Next Permutation

```js
function nextPermutation(nums) {
    let i = nums.length - 2;                   // 向左遍历，i从倒数第二开始是为了nums[i+1]要存在
    while (i >= 0 && nums[i] >= nums[i + 1]) { // 寻找第一个小于右邻居的数
        i--;
    }
    if (i >= 0) {                             // 这个数在数组中存在，从它身后挑一个数，和它换
        let j = nums.length - 1;                // 从最后一项，向左遍历
        while (j >= 0 && nums[j] <= nums[i]) {  // 寻找第一个大于 nums[i] 的数
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]]; // 两数交换，实现变大
    }
    // 如果 i = -1，说明是递减排列，如 3 2 1，没有下一排列，直接翻转为最小排列：1 2 3
    let l = i + 1;           
    let r = nums.length - 1;
    while (l < r) {                            // i 右边的数进行翻转，使得变大的幅度小一些
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++;
        r--;
    }
}
```

## 287. Find the Duplicate Number

```js
var findDuplicate = function(nums) {
    const n = nums.length;
    let l = 1, r = n - 1, ans = -1;
    while (l <= r) {
        let mid = (l + r) >> 1;
        let cnt = 0;
        for (let i = 0; i < n; ++i) {
            cnt += nums[i] <= mid;
        }
        if (cnt <= mid) {
            l = mid + 1;
        } else {
            r = mid - 1;
            ans = mid;
        }
    }
    return ans;
};
```



# 其它经典题

## 20. 有效的括号 Valid Parentheses

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let valid = true;
  const stack = [];
  const mapper = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  for (let i in s) {
    const v = s[i];
    if (["(", "[", "{"].indexOf(v) > -1) {
      stack.push(v);
    } else {
      const peak = stack.pop();
      if (v !== mapper[peak]) {
        return false;
      }
    }
  }

  if (stack.length > 0) return false;

  return valid;
};
```

## 21. 合并两个有序链表 Merge Two Sorted Lists

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```

## 26. 删除排序数组中的重复项 Remove Duplicates from Sorted Array

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const size = nums.length;
  if (size == 0) return 0;
  let slowP = 0;
  for (let fastP = 0; fastP < size; fastP++) {
    if (nums[fastP] !== nums[slowP]) {
      slowP++;
      nums[slowP] = nums[fastP];
    }
  }
  return slowP + 1;
};
```

## 53. 最大子序和 Maximum Subarray

```js
function LSS(list) {
  const len = list.length;
  let max = list[0];
  let min = 0;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += list[i];
    if (sum - min > max) max = sum - min;
    if (sum < min) {
      min = sum;
    }
  }

  return max;
}
```

## 66. 加一 Plus One

```js
var plusOne = function (digits) {
  var carry = 1; // 我们将初始的 +1 也当做是一个在个位的 carry
  for (var i = digits.length - 1; i > -1; i--) {
    if (carry) {
      var sum = carry + digits[i];
      digits[i] = sum % 10;
      carry = sum > 9 ? 1 : 0; // 每次计算都会更新下一步需要用到的 carry
    }
  }
  if (carry === 1) {
    digits.unshift(1); // 如果carry最后停留在1，说明有需要额外的一个长度 所以我们就在首位增添一个 1
  }
  return digits;
};
```



# 基础

## 时间和空间复杂度

数据结构和算法解决的是 “如何让计算机更快、更省空间” 的问题，因此需从执行时间和占用空间两个维度来评估数据结构和算法的性能

掌握复杂度分析，将能编写出性能更优的代码，有利于降低系统开发和维护成本

### 时间复杂度

如果要仔细分析一段代码执行了几次运算

```js
function bFun(n) {
    for(let i = 0; i < n; i++) {         // 需要执行 1 + (n + 1) + n 次
        console.log("Hello, World!");      // 需要执行 n 次
    }
    return 0;       // 需要执行 1 次
}		// 共 3n + 3 次
```

但是老这么仔细分析太花时间没有必要，我们可以 **抓住主要矛盾** 地去快速分析:

```js
// O(1)
function aFun() {
    console.log("Hello, World!");      
    return 0;       
}

// O(n)
function bFun(n) {
    for(let i = 0; i < n; i++) {        
        console.log("Hello, World!");      
    }
    return 0;       
}

// O(n²)
function cal(n) {
   let sum = 0; 
   let i = 1; 
   let j = 1; 
   for (; i <= n; ++i) {  
     j = 1;  
     for (; j <= n; ++j) {  
       sum = sum +  i * j;  
     }
   }
 }

// O(n²)
function cal(n) {
   let ret = 0; 
   let i = 1;
   for (; i < n; ++i) {
     ret = ret + f(i); 
   } 
 } 
function f(n) {
  let sum = 0;
  let i = 1;
  for (; i < n; ++i) {
    sum = sum + i;
  } 
  return sum;
 }
```

**简单概括就是有几层循环就是n的几次方，有嵌套就相乘**

常见时间复杂度: O(1) < O(logn) < (n) < O(nlogn) < O(n²) < O(n³) < O(2ⁿ) < O(n!) < O(nⁿ)

```js
// O(logn)
let i=1;
while (i <= n)  {
   i = i * 2;
}		

// O(nlogn)
function aFun(n){
  let i = 1;
  while (i <= n)  {
     i = i * 2;
  }
  return i
}

function cal(n) { 
   let sum = 0;
   for (let i = 1; i <= n; ++i) {
     sum = sum + aFun(n);
   }
   return sum;
 }
```

不同的情况下，这段代码的时间复杂度是不一样的

```
// n 表示数组 array 的长度
function find(array, n, x) {
  let i = 0;
  let pos = -1;
  for (; i < n; ++i) {
    if (array[i] == x) {
      pos = i; 
      break;
    }
  }
  return pos;
}
```

最好情况时间复杂度 O(1)，最坏情况时间复杂度 O(n)，平均时间复杂度 O(n)



### 空间复杂度

```js
// O(n)
function print(n) {
 const newArr = []; 
 newArr.length = n; 
  for (let i = 0; i <n; ++i) {
    newArr[i] = i * i;
  }

  for (let j = n-1; j >= 0; --j) {
    console.log(newArr[i])
  }
}
```



平时我们在写代码时，是用 空间换时间 还是 时间换空间，可以根据算法的时间复杂度和空间复杂度来衡量



参考文章：

https://time.geekbang.org/column/article/40036

https://github.com/biaochenxuying/blog/issues/29



# 算法

**数据结构本质上只有两种，一种叫数组，一种叫链表**

**算法本质就是穷举**

# 数组

**「静态数组」就是一块连续的内存空间，我们可以通过索引来访问这块内存空间中的元素，这才是数组的原始形态**。

而「动态数组」是编程语言为了方便我们使用，在静态数组的基础上帮我们添加了一些常用的 API，比如 `push, insert, remove` 等等方法，这些 API 可以让我们更方便地操作数组元素，不用自己去写代码实现这些操作。

**数组的超能力「随机访问」：只要给定任何一个数组索引，我可以在 O\(1) 的时间内直接获取到对应元素的值**。

要在数组中间增或删，就需要 **数据搬移** 并且注意遍历顺避免覆盖所以在数组中增或删时间复杂度是O(n)



**动态数组底层还是静态数组，只是自动帮我们进行数组空间的扩缩容，并把增删查改操作进行了封装，让我们使用起来更方便而已**。

## 动态数组常用方法

```js
// 创建动态数组
// 不用显式指定数组大小，它会根据实际存储的元素数量自动扩缩容
var arr = [];

arr.push(i); // 在数组末尾添加一个元素
arr.pop(); // 删除数组末尾的元素

arr.shift(); // 删除数组第一个元素
arr.unshift(i); // 在数组第一个位置添加一个元素

arr.splice(index, 0, i); // 在 index 位置插入一个元素
arr.splice(index, 1); // 删除 index 位置的元素

var index = arr.indexOf(666); // 根据元素值查找索引，时间复杂度 O(N)
```

`splice()` 语法  array.splice(start, deleteCount, item1, item2, ...)



# 链表(链式存储)

数组（顺序存储）的底层原理，说白了就是一块连续的内存空间，有了这块内存空间的首地址，就能直接通过索引计算出任意位置的元素地址。

链表不一样，一条链表并不需要一整块连续的内存空间存储元素。链表的元素可以分散在内存空间的天涯海角，通过每个节点上的 `next, prev` 指针，将零散的内存块串联起来形成一个链式结构。可以提高内存的利用效率.

数组最大的优势是支持通过索引快速访问元素，而链表就不支持。

工具函数

```js
var ListNode = function(x) {
    this.val = x;
    this.next = null;
};

// 输入一个数组，转换为一条单链表
var createLinkedList = function(arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
```

```js
// 创建一条单链表
let head = createLinkedList([1, 2, 3, 4, 5]);

// 遍历单链表
for (let p = head; p != null; p = p.next) {
    console.log(p.val);
}
```

```js
// 创建一条单链表
var head = createLinkedList([1, 2, 3, 4, 5]);

// 在单链表尾部插入一个新节点 6
var p = head;
// 先走到链表的最后一个节点
while (p.next !== null) {
    p = p.next;
}
// 现在 p 就是链表的最后一个节点
// 在 p 后面插入新节点
p.next = new ListNode(6);

// 现在链表变成了 1 -> 2 -> 3 -> 4 -> 5 -> 6
```

