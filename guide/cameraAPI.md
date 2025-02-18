# 摄像头 API

本文档详细说明了无人机摄像头相关的 API，包括图像获取和处理。

## 摄像头操作

### drone.getBottomCameraImage()

获取底部摄像头的图像。

#### 返回值

返回一个 Canvas 元素，包含当前帧的图像数据。

### frame 参数

用户代码中的 `frame` 参数是一个 OpenCV.js 的 Mat 对象，可以直接用于图像处理。

#### 示例

```javascript
// 转换为灰度图
const gray = new cv.Mat();
cv.cvtColor(frame, gray, cv.COLOR_RGB2GRAY);

// 返回处理后的图像
return [{ hover: true, angle: 0, speed: 0, altitude: 1.0 }, gray];
```

## 图像处理

### OpenCV.js 集成

无人机系统集成了 OpenCV.js，可以直接使用其提供的图像处理功能。

#### 常用操作

1. 颜色空间转换
```javascript
cv.cvtColor(src, dst, cv.COLOR_RGB2GRAY);
cv.cvtColor(src, dst, cv.COLOR_RGB2HSV);
```

2. 图像滤波
```javascript
cv.GaussianBlur(src, dst, new cv.Size(5, 5), 0);
cv.medianBlur(src, dst, 5);
```

3. 边缘检测
```javascript
cv.Canny(src, dst, 50, 150);
```

### 注意事项

1. **内存管理**
   - 及时释放创建的 Mat 对象
   - 使用 try-finally 确保资源释放

2. **性能优化**
   - 避免频繁创建临时对象
   - 合理使用 ROI(感兴趣区域)
   - 根据需要降低处理分辨率

3. **图像质量**
   - 注意光照条件对图像的影响
   - 考虑运动模糊的影响
   - 适当的预处理可以提高识别效果
