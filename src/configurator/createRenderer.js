import { WebGLRenderer, PCFSoftShadowMap } from "three";

export default function createRenderer(container) {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.localClippingEnabled = true;
  renderer.setClearColor(0xffffff, 0);
  container.appendChild(renderer.domElement);
  return renderer;
}
