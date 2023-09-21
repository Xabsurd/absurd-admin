export type containerType = {
  canvas: HTMLCanvasElement;
  ctx: GPUCanvasContext;
  adapter: GPUAdapter;
  device: GPUDevice;
};
export type shadow_containerType = {
  canvas: HTMLCanvasElement | null;
  ctx: GPUCanvasContext | null;
  adapter: GPUAdapter | null;
  device: GPUDevice | null;
};
