// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCode from '../../../app/service/code';

declare module 'egg' {
  interface IService {
    code: ExportCode;
  }
}
