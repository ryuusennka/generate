#!/usr/bin/env node

/*
 * @Author        : ryuusennka
 * @Date          : 2021-11-10 22:31:26
 * @LastEditors   : ryuusennka
 * @LastEditTime  : 2021-11-11 03:24:27
 * @FilePath      : /generate/index.js
 * @Description   :
 */

const colors = require('colors');
const del = require('del');
const fs = require('fs');
const inquirer = require('inquirer');
const ncp = require('ncp');
const path = require('path');

const { handlerPromise, resolve } = require('./config');

// 读模板目录
const readTemplateDir = () => fs.readdirSync(path.join(__dirname, 'templates'));

const SELECT_A_TEMPLATE = 'SELECT_A_TEMPLATE'; // 选择模板
const CREATE_DIR_NAME = 'CREATE_DIR_NAME'; // 创建的名称

const questions = [
  {
    type: 'list',
    name: SELECT_A_TEMPLATE,
    message: '请选择模板：',
    choices: readTemplateDir(),
  },
  {
    type: 'input',
    name: CREATE_DIR_NAME,
    message: '项目名称',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return '不是有效的项目名称';
    },
  },
];

inquirer
  .prompt(questions)
  .then(answers => {
    const projectName = answers[CREATE_DIR_NAME]; // 创建时候的命名
    const dist = path.join(process.cwd(), projectName); // 复制到的路径
    const template = resolve(`templates/${answers[SELECT_A_TEMPLATE]}`); // 要拷贝的模板
    // 创建目录
    fs.mkdirSync(dist, { recursive: true });
    // 拷贝到目录
    ncp(template, dist, err => {
      if (err) throw err;
      // 移除可能不该出现的文件
      del([path.join(dist, '.git'), path.join(dist, 'node_modules')]);
    });

    console.log('进程已完成'.green);
    console.log(`执行下列命令开始 coding:`.green);
    console.log(`cd ${projectName}`.yellow);
    console.log(`修改 .env.example 为 .env, 并修改相关参数`.red);
    console.log(`执行 npm install 或者 yarn install`.green);
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
