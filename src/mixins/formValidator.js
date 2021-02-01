// 常用表单校验
export default {
  methods: {
    // 校验用户名
    regexUserName(value) {
      if (!value) {
        this.$message({
          message: '请输入用户名',
          type: 'error'
        });
        return false;
      }
      if (/^(?![0-9]+$)[0-9A-Za-z]{4,16}$/.test(value) === false) {
        this.$message({
          message: '用户名由英文字母、数字组成，且不能为纯数字',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 校验密码
    regexPwd(value) {
      if (!value) {
        this.$message({
          message: '请输入密码',
          type: 'error'
        });
        return false;
      }
      if (/^[a-zA-Z0-9]{6,16}$/.test(value) === false) {
        this.$message({
          message: '登录密码需为6-16位字符，区分大小写',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 校验手机号
    regexPhone(value) {
      if (!value) {
        this.$message({
          message: '请输入手机号',
          type: 'error'
        });
        return false;
      }
      if (/^1[3456789]\d{9}$/.test(value) === false) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 校验交易密码
    regexPayPwd(value) {
      if (!value) {
        this.$message({
          message: '请输入交易密码',
          type: 'error'
        });
        return false;
      }
      if (/^\d{6}$/.test(value) === false) {
        this.$message({
          message: '请输入6位纯数字密码',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 校验邮箱
    regexEmail(value) {
      if (!value) {
        this.$message({
          message: '请输入邮箱',
          type: 'error'
        });
        return false;
      }
      var reg = /^([a-zA-Z0-9]+[_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/gi;
      if (reg.test(value) === false) {
        this.$message({
          message: '请输入正确的邮箱',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 判断中文姓名且字符必须大于两位
    chName(value) {
      if (!value) {
        this.$message({
          message: '请输入真实姓名',
          type: 'error'
        });
        return false;
      }
      if (/^[\u4e00-\u9fa5]*$/.test(value) === false) {
        this.$message({
          message: '真实姓名仅为中文',
          type: 'error'
        });
        return false;
      }
      if (/^[\u4e00-\u9fa5]{2,}$/.test(value) === false) {
        this.$message({
          message: '请输入正确的真实姓名',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 银行卡号校验
    regexBankNo(value) {
      if (!value) {
        this.$message({
          message: '请填写银行账户',
          type: 'error'
        });
        return false;
      }
      if (/^([1-9]{0})(\d{16}|\d{19})$/.test(value) === false) {
        this.$message({
          message: '请填写正确的银行账户',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 身份证校验
    regexIdCard(value) {
      // 15位和18位身份证号码的正则表达式
      var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X|x])$)$/;
      // 如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(value)) {
        if (value.length === 18) {
          var idCardWi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; // 将前17位加权因子保存在数组里
          var idCardY = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]; // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
          var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
          }
          var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
          var idCardLast = value.substring(17); // 得到最后一位身份证号码
          // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod === 2) {
            if (idCardLast === 'X' || idCardLast === 'x') {
              return true;
            } else {
              this.$message({
                message: '身份证号填写错误',
                type: 'error'
              });
              return false;
            }
          } else {
            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (Number(idCardLast) === Number(idCardY[idCardMod])) {
              return true;
            } else {
              this.$message({
                message: '身份证号填写错误',
                type: 'error'
              });
              return false;
            }
          }
        }
      } else {
        this.$message({
          message: '请输入正确的身份证号',
          type: 'error'
        });
        return false;
      }
    },
    // 校验表情符
    regexFace(value) {
      var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[A9|AE]\u3030|\uA9|\uAE|\u3030/ig;
      if (regStr.test(value)) {
        this.$message({
          message: '存在非法表情字符',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 校验昵称
    regexNickname(value) {
      if (!value) {
        this.$message({
          message: '请输入昵称',
          type: 'error'
        });
        return false;
      }
      if (/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value) === false) {
        this.$message({
          message: '昵称只能包含中文、英文和数字',
          type: 'error'
        });
        return false;
      }
      return true;
    }
  }
};
