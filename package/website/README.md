## 安装

node版本 v22.14.0

安装pnpm

```bash
npm install pnpm -g
```

安装依赖

```bash
pnpm i
```

## 运行

```bash
pnpm run dev
```

## 打包

```bash
pnpm run build
```

## 类型检查

```bash
pnpm run type-check
```

## TypeScript 迁移说明

本项目已从 JavaScript 全面迁移至 TypeScript。
- 所有 `.js` 文件已转换为 `.ts`。
- Vue 组件已使用 `<script setup lang="ts">`。
- 添加了 strict 模式的 `tsconfig.json`。
- 构建流程包含了类型检查 (`vue-tsc`).
