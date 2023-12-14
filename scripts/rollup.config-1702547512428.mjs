import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import clear from 'rollup-plugin-clear';
import typescript2 from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import * as packageInfo from '../package.json' assert { type: 'json' };
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

// 安装以下 npm 包
const { name, version, author } = packageInfo;
const pkgName = 'mypkg';
const banner = '/*!\n' +
    ` * ${name} v${version}\n` +
    ` * (c) 2014-${new Date().getFullYear()} ${author}\n` +
    ' * Released under the MIT License.\n' +
    ' */';
var baseConfig = {
    input: 'src/index.ts',
    // 同时打包多种规范的产物
    output: [
        {
            file: `dist/index.umd.js`,
            format: 'umd',
            name: pkgName,
            banner
        },
        {
            file: `dist/index.umd.min.js`,
            format: 'umd',
            name: pkgName,
            banner,
            plugins: [terser()]
        },
        {
            file: `dist/index.cjs.js`,
            format: 'cjs',
            name: pkgName,
            banner
        },
        {
            file: `dist/index.esm.js`,
            format: 'es',
            banner
        }
    ],
    // 注意 plugin 的使用顺序
    plugins: [
        json(),
        typescript2({
            tsConfig: '../tsconfig.json',
        }),
        clear({
            targets: ['dist']
        }),
        alias(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            preventAssignment: true
        }),
        nodeResolve(),
        commonjs({
            include: 'node_modules/**'
        }),
        eslint({
            throwOnError: true, // 抛出异常并阻止打包
            include: ['src/**'],
            exclude: ['node_modules/**']
        }),
        babel({ babelHelpers: 'bundled' })
    ]
};

var rollup_config_dev = Object.assign(Object.assign({}, baseConfig), { plugins: [
        ...baseConfig.plugins,
        serve({
            port: 8080,
            contentBase: ['dist', 'examples/brower'],
            openPage: 'index.html',
        }),
        livereload({
            watch: 'examples/brower',
        })
    ] });

export { rollup_config_dev as default };
