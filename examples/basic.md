# 基础示例

本页面提供了一些基础的代码示例，帮助您了解如何控制无人机。

## 画正方形

这个示例展示了如何让无人机按照正方形轨迹飞行。

```javascript
// 使用全局变量存储状态
if (typeof window.currentStep === 'undefined') {
    window.currentStep = 0;
    window.startTime = Date.now();
}

const stepDuration = 2000; // 每个动作持续2秒
const elapsedTime = Date.now() - window.startTime;

// 时间到后进入下一步
if (elapsedTime >= stepDuration) {
    window.currentStep = (window.currentStep + 1) % 4;
    window.startTime = Date.now();
}

// 定义四个移动方向（右、前、左、后）
const commands = [
    { hover: false, angle: 0, speed: 0.25, altitude: 1.0 },      // 向右
    { hover: false, angle: Math.PI/2, speed: 0.25, altitude: 1.0 },  // 向前
    { hover: false, angle: Math.PI, speed: 0.25, altitude: 1.0 },    // 向左
    { hover: false, angle: -Math.PI/2, speed: 0.25, altitude: 1.0 }  // 向后
];

// 返回当前命令和原始图像
return [commands[window.currentStep], frame];
```

### 代码说明

1. 使用全局变量记录当前步骤和开始时间
2. 每个动作持续 2 秒
3. 定义四个方向的运动命令
4. 按顺序执行命令形成正方形轨迹

## 寻找红点

这个示例展示了如何使用 OpenCV.js 检测红色目标。

```javascript
// 转换为 HSV 颜色空间
const hsvFrame = new cv.Mat();
cv.cvtColor(frame, hsvFrame, cv.COLOR_RGB2HSV);

// 定义红色范围
const lowerRed = new cv.Mat(hsvFrame.rows, hsvFrame.cols, hsvFrame.type(), [0, 100, 100, 255]);
const upperRed = new cv.Mat(hsvFrame.rows, hsvFrame.cols, hsvFrame.type(), [10, 255, 255, 255]);
const mask = new cv.Mat();
cv.inRange(hsvFrame, lowerRed, upperRed, mask);

// 形态学操作去除噪声
const kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(5, 5));
cv.morphologyEx(mask, mask, cv.MORPH_OPEN, kernel);

// 查找轮廓
const contours = new cv.MatVector();
const hierarchy = new cv.Mat();
cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

// 查找最大轮廓
let maxContour = null;
let maxArea = 0;
for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);
    const area = cv.contourArea(contour);
    if (area > maxArea) {
        maxArea = area;
        maxContour = contour;
    }
}

// 如果找到红色目标
if (maxContour) {
    // 计算最小外接圆
    const circle = cv.minEnclosingCircle(maxContour);
    
    // 在图像上绘制检测结果
    cv.circle(frame, circle.center, circle.radius, new cv.Scalar(0, 255, 0, 255), 2);
    
    // 释放内存
    clearMemory();
    
    // 返回处理后的图像
    return [{ hover: true, angle: 0, speed: 0, altitude: 1.0 }, frame];
} else {
    // 未找到目标，继续搜索
    clearMemory();
    return [{ hover: false, angle: 0, speed: 0.1, altitude: 1.0 }, frame];
}

function clearMemory() {
    hsvFrame.delete();
    lowerRed.delete();
    upperRed.delete();
    mask.delete();
    kernel.delete();
    contours.delete();
    hierarchy.delete();
}
```

### 代码说明

1. 将图像转换为 HSV 颜色空间
2. 设定红色的颜色范围
3. 使用形态学操作去除噪声
4. 查找并分析轮廓
5. 在找到目标时悬停，否则继续搜索
6. 注意释放 OpenCV.js 的内存

## 追踪红点

这个示例展示了如何让无人机追踪红色目标。

```javascript
// 转换为 HSV 颜色空间并检测红色（代码同上）...

// 如果找到红色目标
if (maxContour) {
    // 计算目标在图像中的位置
    const circle = cv.minEnclosingCircle(maxContour);
    const imageCenter = frame.cols / 2;
    const imageMiddle = frame.rows / 2;
    const xOffset = circle.center.x - imageCenter;
    const yOffset = circle.center.y - imageMiddle;
    
    // 判断是否对准目标
    const isAligned = Math.abs(xOffset) <= 10 && Math.abs(yOffset) <= 10;
    
    if (!isAligned) {
        // 未对准，调整位置
        let angle;
        if (Math.abs(xOffset) > Math.abs(yOffset)) {
            // 左右偏移更大，优先调整水平方向
            angle = xOffset > 0 ? 0 : Math.PI;
        } else {
            // 前后偏移更大，优先调整前后方向
            angle = yOffset > 0 ? Math.PI/2 : -Math.PI/2;
        }
        
        clearMemory();
        return [{ 
            hover: false, 
            angle: angle,
            speed: 0.1,
            altitude: 1.0 
        }, frame];
    } else {
        // 已对准，降低高度
        clearMemory();
        return [{ 
            hover: true, 
            angle: 0, 
            speed: 0, 
            altitude: 0.2 
        }, frame];
    }
} else {
    // 未找到目标，按正方形路径搜索
    // ... 正方形搜索代码 ...
}
```

### 代码说明

1. 检测红色目标位置
2. 计算目标相对于图像中心的偏移
3. 根据偏移方向调整无人机位置
4. 对准目标后降低高度
5. 未找到目标时执行搜索策略

## 注意事项

1. **状态管理**
   - 使用全局变量存储状态
   - 注意变量初始化
   - 合理使用状态机

2. **运动控制**
   - 速度要适中
   - 转向要平滑
   - 注意安全距离

3. **图像处理**
   - 释放 OpenCV 资源
   - 优化处理性能
   - 处理边界情况

4. **代码结构**
   - 模块化设计
   - 清晰的注释
   - 错误处理 