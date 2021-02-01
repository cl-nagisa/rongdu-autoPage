// 格式化时间
const fmtDate = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3) // 季度
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

// 时间戳转日期型
exports.dateFormatFun = (time, fmt = 1) => {
  if (isNaN(time)) {
    return time;
  }
  if (time > 0) {
    switch (fmt) {
      case 1:
        return fmtDate(new Date(time), 'yyyy-MM-dd');
      case 2:
        return fmtDate(new Date(time), 'yyyy-MM-dd hh:mm');
      case 3:
        return fmtDate(new Date(time), 'MM月dd日 hh:mm');
      case 4:
        return fmtDate(new Date(time), 'yyyy-MM-dd hh:mm:ss');
      case 5:
        return fmtDate(new Date(time), 'hh:mm');
      case 6:
        return fmtDate(new Date(time), 'hh:mm:ss');
      case 7:
        return fmtDate(new Date(time), 'yyyy年MM月dd日');
      case 8:
        return fmtDate(new Date(time), 'yyyy.MM.dd');
      case 9:
        return fmtDate(new Date(time), 'yyyy/MM/dd');
      default:
        return fmtDate(new Date(time), 'yyyy-MM-dd');
    }
  }
};

/**
 * 字符串截取
 * cutStr  字符串
 * start   字符串的开始位置
 * end     字符串的结束位置
 */
exports.cutStr = (str, start, end) => {
  if (str) {
    str = str.substring(start, end);
    return str;
  } else {
    return '';
  }
};

// 保留N位小数，不四舍五入
exports.cutNumber = (value, len = 2) => {
  if (isNaN(value) || len < 1) {
    return false;
  }
  value = value.toString();
  if (value.indexOf('.') >= 0) {
    return parseFloat(value.substr(0, value.indexOf('.') + len + 1));
  } else {
    return parseFloat(value);
  }
};

// 金额格式化
exports.currency = (value, currency, decimals) => {
  const digitsRE = /(\d{3})(?=\d)/g;
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return '0';
  currency = currency != null ? currency : '';
  decimals = decimals != null ? decimals : 2;
  let stringified = (Math.abs(value)).toString();
  if (stringified.indexOf('.') >= 0) {
    const x = stringified.substring(0, stringified.indexOf('.'));
    const y = parseFloat(stringified.substring(stringified.indexOf('.') + 1, stringified.indexOf('.') + decimals + 2));
    let newY = y;
    if (y.toString().length < decimals + 1) {
      for (let i = 0; i < (decimals + 1) - y.toString().length; i++) {
        newY = newY + '0';
      }
    }
    stringified = x + '.' + newY;
  } else {
    stringified = parseFloat(stringified).toFixed(decimals + 1);
  }
  stringified = stringified.substring(0, stringified.toString().length - 1);
  const _int = decimals || decimals === 0 ? stringified.slice(0, -1 - decimals) : stringified;
  const i = _int.length % 3;
  const head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : '';
  const _float = decimals ? stringified.slice(-1 - decimals) : '';
  const sign = value < 0 ? '-' : '';
  if (decimals === 0) return sign + head + _int.slice(i).replace(digitsRE, '$1,');
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
};

// 金额万元化
exports.moneyThousand = (value, unit = '万') => {
  if (!value) {
    return '';
  }
  if (value > 10000) {
    value = (value / 10000).toString();
    if (value.indexOf('.') >= 0) {
      const x = this.currency(value.substring(0, value.indexOf('.')), 0);
      const y = parseFloat(value.substring(value.indexOf('.') + 1, value.indexOf('.') + 3));
      value = x + '.' + y;
    } else {
      value = this.currency(value, 0);
    }
    return value + unit;
  } else {
    return parseFloat(value);
  }
};

// 去html标签
exports.htmlTagsNo = (value) => {
  if (!value) return '';
  value = value.replace(/<[^>]+>/g, '');
  return value;
};

// 限制字符长度
exports.hideBorrowName = (name, len = 20) => {
  if (name !== undefined && name.length > len) {
    return (name.substr(0, len) + '…');
  } else {
    return name;
  }
};

// 手机号码隐藏中间4位
exports.mobilePhone = (value) => {
  if (!value) {
    return '';
  }
  return (value.substr(0, 3) + '****' + value.substr(-4, 4));
};

// 手机号码带空格
exports.mobileSpace = (value) => {
  if (!value) {
    return '';
  }
  return (value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(-4, 4));
};

// 身份证号隐藏中间8位
exports.idCard = (value) => {
  if (!value) {
    return '';
  }
  return (value.substr(0, 6) + '********' + value.substr(-4, 4));
};

// 真实姓名带*号影藏
exports.realName = (value) => {
  if (!value) {
    return '';
  }
  if (value.length === 2) {
    return value.substr(0, 1) + '*';
  } else {
    return value.substr(0, 1) + '*' + value.substr(-1, 1);
  }
};

// 金额单位格式化
exports.moneyFmt = (value, isUnitShow = true, isGetUnit = false) => {
  value = parseInt(value);
  const b = 100000000;
  const m = 10000;
  const t = 1000;
  let money = value;
  let unit = '';

  if (value <= 0) {
    money = value;
  }
  if (value > b) {
    money = this.cutNumber(value / b);
    unit = '亿';
  }
  if (value > m) {
    money = this.cutNumber(value / m);
    unit = '万';
  }
  if (value > t) {
    money = this.cutNumber(value / t);
    unit = '千';
  }

  if (!isUnitShow) {
    unit = '';
  }

  if (isGetUnit) {
    return unit;
  } else {
    return money + unit;
  }
};
