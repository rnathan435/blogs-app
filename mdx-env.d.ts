declare module "*.mdx" {
  import type { ComponentType, ComponentProps } from "react"
  const component: ComponentType<ComponentProps<any>>
  export default component
}