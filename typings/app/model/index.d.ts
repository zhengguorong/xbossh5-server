// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCode from '../../../app/model/code';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Code: ReturnType<typeof ExportCode>;
    User: ReturnType<typeof ExportUser>;
  }
}
