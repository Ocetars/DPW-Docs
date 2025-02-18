# 无人机 API

本文档详细说明了无人机控制相关的 API，包括运动控制和位置设置。

## 运动控制

### 运动命令对象

用户代码需要返回一个运动命令对象，用于控制无人机的运动状态：

```javascript
{
    hover: boolean,    // 是否悬停
    angle: number,     // 运动角度（弧度）
    speed: number,     // 运动速度
    altitude: number   // 目标高度
}
```

#### 参数说明

- `hover`: 是否处于悬停状态
  - `true`: 悬停，忽略 angle 和 speed
  - `false`: 按指定角度和速度运动

- `angle`: 运动方向角度（弧度）
  - `0`: 向右
  - `Math.PI/2`: 向前
  - `Math.PI`: 向左
  - `-Math.PI/2`: 向后

- `speed`: 运动速度
  - 取值范围：0 ~ 1.0
  - 建议范围：0.1 ~ 0.5
  - 单位：米/秒

- `altitude`: 目标高度
  - 取值范围：0.05 ~ 5.0
  - 单位：米
  - 注意：实际高度会平滑过渡到目标高度

### 示例

```javascript
// 向右飞行
return [{
    hover: false,
    angle: 0,
    speed: 0.25,
    altitude: 1.0
}, frame];

// 悬停
return [{
    hover: true,
    angle: 0,
    speed: 0,
    altitude: 0.5
}, frame];
```

## 位置控制

### drone.movement.setPosition(x, y, z)

直接设置无人机的位置。

#### 参数

- `x`: X 坐标（左右方向）
- `y`: Y 坐标（高度）
- `z`: Z 坐标（前后方向）

#### 示例

```javascript
drone.movement.setPosition(0, 1.0, 0); // 设置到中心点上方1米处
```

## 状态查询

### drone.movement.model.position

获取无人机当前位置。

#### 属性

- `x`: X 坐标
- `y`: Y 坐标（高度）
- `z`: Z 坐标

#### 示例

```javascript
const currentHeight = drone.movement.model.position.y;
```