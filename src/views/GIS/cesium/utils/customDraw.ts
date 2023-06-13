import { cloneDeep } from 'lodash';
import * as Cesium from 'cesium';

export default class customDraw {
  //私有变量
  #viewer: Cesium.Viewer; //地图对象
  #drawLayer: Cesium.CustomDataSource; //绘制的图层
  #handle: Cesium.ScreenSpaceEventHandler | undefined;
  /**
   *
   * @param _viewer Cesium.Viewer
   */
  constructor(_viewer: Cesium.Viewer) {
    if (!_viewer) {
      throw new Error('必要参数:_viewer: Cesium.Viewer');
    }
    this.#viewer = _viewer;
    this.#drawLayer = new Cesium.CustomDataSource('customDrawLayer');
    this.#viewer.dataSources.add(this.#drawLayer);
  }
  clearDraw() {
    this.#drawLayer.entities.removeAll();
  }
  //创建一个点实体
  #createPoint(worldPosition: Cesium.Cartesian3) {
    return this.#drawLayer.entities.add({
      position: worldPosition,
      point: {
        color: Cesium.Color.WHITE,
        pixelSize: 8
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      }
    });
  }
  DrawPolyline(): Promise<Cesium.Cartesian3[]> {
    this.#viewer.scene.globe.depthTestAgainstTerrain = true;
    this.#handle = new Cesium.ScreenSpaceEventHandler(this.#viewer.scene.canvas);
    return new Promise((reslove, reject) => {
      let activeShapePoints: Array<Cesium.Cartesian3> = [];
      let outputPoints: Array<Cesium.Cartesian3> = [];
      let activeShape: Cesium.Entity | null;
      let floatingPoint: Cesium.Entity | null;
      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
        const earthPosition = this.#viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {
          if (activeShapePoints.length === 0) {
            floatingPoint = this.#createPoint(earthPosition);
            activeShapePoints.push(earthPosition);
            const dynamicPositions = new Cesium.CallbackProperty(() => {
              // return new Cesium.PolygonHierarchy(activeShapePoints);
              return activeShapePoints;
            }, false);
            activeShape = this.#drawLayer.entities.add({
              //绘制动态图
              polyline: {
                positions: dynamicPositions,
                width: 10,
                material: new Cesium.PolylineGlowMaterialProperty({
                  glowPower: 0.1,
                  color: Cesium.Color.YELLOW
                }),
                clampToGround: true
              }
            });
          }
          outputPoints.push(cloneDeep(earthPosition));
          activeShapePoints.push(earthPosition);
          this.#createPoint(earthPosition); //添加点
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
        if (Cesium.defined(floatingPoint)) {
          const newPosition = this.#viewer.scene.pickPosition(event.endPosition);
          if (Cesium.defined(newPosition)) {
            if (floatingPoint?.position) {
              floatingPoint.position = newPosition as any;
            }
            activeShapePoints[activeShapePoints.length - 1] = newPosition;
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
        activeShapePoints.pop(); //去除最后一个动态点
        activeShapePoints.pop();
        outputPoints.pop();
        terminateShape();
        this.#viewer.trackedEntity = undefined;
        return false;
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
        terminateShape();
        this.#viewer.trackedEntity = undefined;
        return false;
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

      //绘制最终几何
      const terminateShape = () => {
        this.#drawLayer.entities.add({
          polyline: {
            positions: activeShapePoints,
            width: 10,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW
            }),
            clampToGround: true
          }
        });
        this.#viewer.entities.remove(floatingPoint as Cesium.Entity); //去除动态点图形（当前鼠标点）
        this.#viewer.entities.remove(activeShape as Cesium.Entity); //去除动态图形
        floatingPoint = null;
        activeShape = null;
        this.#handle?.destroy();
        reslove(outputPoints);
        this.#viewer.scene.globe.depthTestAgainstTerrain = false;
        activeShapePoints = [];
        outputPoints = [];
        this.#handle?.destroy();
      };
    });
  }
  DrawPolygon(): Promise<Cesium.Cartesian3[]> {
    this.#viewer.scene.globe.depthTestAgainstTerrain = true;
    this.#handle = new Cesium.ScreenSpaceEventHandler(this.#viewer.scene.canvas);
    return new Promise((reslove, reject) => {
      let activeShapePoints: Array<Cesium.Cartesian3> = [];
      let outputPoints: Array<Cesium.Cartesian3> = [];
      let activeShape: Cesium.Entity | null;
      let floatingPoint: Cesium.Entity | null;

      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
        const earthPosition = this.#viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {
          if (activeShapePoints.length === 0) {
            floatingPoint = this.#createPoint(earthPosition);
            activeShapePoints.push(earthPosition);

            const dynamicPositions = new Cesium.CallbackProperty(() => {
              return new Cesium.PolygonHierarchy(activeShapePoints);
            }, false);
            activeShape = this.#drawLayer.entities.add({
              //绘制动态图
              polygon: {
                hierarchy: dynamicPositions,
                material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0.7))
              }
            });
          }
          outputPoints.push(cloneDeep(earthPosition));
          activeShapePoints.push(earthPosition);
          this.#createPoint(earthPosition); //添加点
        }
        return false;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
        if (Cesium.defined(floatingPoint)) {
          const newPosition = this.#viewer.scene.pickPosition(event.endPosition);
          if (Cesium.defined(newPosition)) {
            if (floatingPoint?.position) {
              floatingPoint.position = newPosition as any;
            }
            activeShapePoints[activeShapePoints.length - 1] = newPosition;
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
        activeShapePoints.pop(); //去除最后一个动态点
        activeShapePoints.pop();
        outputPoints.pop();
        terminateShape();
        this.#viewer.trackedEntity = undefined;
        return false;
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      this.#handle?.setInputAction((event: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
        terminateShape();
        this.#viewer.trackedEntity = undefined;
        return false;
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

      //绘制最终几何
      const terminateShape = () => {
        this.#drawLayer.entities.add({
          polygon: {
            hierarchy: activeShapePoints as any,
            material: Cesium.Color.CYAN.withAlpha(0.5),
            outline: true,
            closeTop: false,
            closeBottom: false,
            outlineColor: Cesium.Color.WHITE
          }
        });
        this.#viewer.entities.remove(floatingPoint as Cesium.Entity); //去除动态点图形（当前鼠标点）
        this.#viewer.entities.remove(activeShape as Cesium.Entity); //去除动态图形
        floatingPoint = null;
        activeShape = null;
        this.#handle?.destroy();
        reslove(outputPoints);
        this.#viewer.scene.globe.depthTestAgainstTerrain = false;
        activeShapePoints = [];
        outputPoints = [];
        this.#handle?.destroy();
      };
    });
  }
}
