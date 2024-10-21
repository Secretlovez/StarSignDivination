module.exports = {
  allowCustomScopes: true, // 允许自定义主题
  allowBreakingChanges: ['feat', 'fix'], // 指定破坏性更新提交类型
  askForBreakingChangeFirst: false, // 先询问破坏性更新
  appendBranchNameToCommitMessage: true,
  breaklineChar: '|', // 提交内容分割符
  breakingPrefix: 'BREAKING CHANGE:',
  footerPrefix: 'ISSUES CLOSED:',
  scopes: [], // 提交主题范围描述
  subjectLimit: 100, // 提交描述字数限制
  skipQuestions: ['footer'], // 指定跳过问题类型:header/body/footer
  scopeOverrides: [], // 覆盖提交类型主题范围
  skipEmptyScopes: true, // 是否跳过空主题
  subjectSeparator: ': ', // 提交描述分隔符
  typePrefix: '', // 提交类型前缀
  typeSuffix: '', // 提交类型后缀
  ticketNumberPrefix: 'ISSUES CLOSED:',
  upperCaseSubject: false,
  usePreparedCommit: false,
  types: [
    { value: 'build', name: 'build: 依赖调整' },
    { value: 'chore', name: 'chore: 杂项更新' },
    { value: 'ci', name: 'ci: 脚本更新' },
    { value: 'docs', name: 'docs: 文档变更' },
    { value: 'feat', name: 'feat: 功能新增' },
    { value: 'fix', name: 'fix: 问题修复' },
    { value: 'perf', name: 'perf: 性能优化' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'revert', name: 'revert: 版本回退' },
    { value: 'style', name: 'style: 格式调整' },
    { value: 'test', name: 'test: 测试用例' },
    { value: 'WIP', name: 'wip: 工作进程' },
  ],
  messages: {
    type: '请选择提交类型(必填)',
    scope: '请选择更新范围(可选)',
    customScope: '请输入内容修改范围(可选)',
    subject: '请简要描述提交内容(必填)',
    body: '请详细描述提交内容(可选)',
    breaking: '请说明非兼容性更新内容(可选)',
    footer: '请列出需要关闭的问题项(可选)',
    confirmCommit: '您确定要提交上述更新内容吗？',
  },
};
