import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
      },
    ],
    plugins: [
      typescript({
        exclude: ["**/__test__", "**/*.test.ts"],
        declaration: true,
        declarationDir: "dist/types",
      }),
      terser(),
    ],
    external: ["dayjs"],
  },
  {
    input: "dist/types/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];
