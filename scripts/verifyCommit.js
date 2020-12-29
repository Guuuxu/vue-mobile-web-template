// Invoked on the commit-msg git hook by yorkie.
// feat: 新功能、新特性
// fix: 修改 bug
// perf: 更改代码，以提高性能
// refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
// docs: 文档修改
// style: 仅仅修改了空格、缩进等，不改变代码逻辑；
// test: 测试用例新增、修改
// build: 影响项目构建或依赖项修改
// revert: 恢复上一次提交
// ci: 持续集成相关文件修改
// chore: 构建过程或辅助工具的变动（不会影响代码运行）
// release: 发布新版本
// workflow: 工作流相关文件修改
// build: 影响构建系统或外部依赖项的更改（示例范围：gulp，broccoli，npm）
// wip: 目前工作区中的代码正在编写中，这部分代码不能独立运行，是半成品
// types: 类型(typescript)修改
const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,72}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}`
  );
  process.exit(1);
}
