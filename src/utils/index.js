import request from '@/utils/request';
import EXIF from 'exif-js';

export function validateMobile(mobile) {
  if (!mobile) return false;
  return /^1[345789]\d{9}$/.test(mobile);
}

export function validatePassword(password) {
  if (!password) return false;
  return /.{6,}/.test(password);
}

/**
 * 图片上传
 * @param file 文件
 * @param resCallBack 上传完后回调
 * @param errCallback 上传失败回调
 * @param progressCallBack 上传进度回调
 * @param options 配置 {width,height,quality}可以只写宽度，会等比例缩放 quality:图片质量 图片小于于5m,图片质量默认为0.7，大于5m,图片质量为0.3
 */
export function imageUpload(
  file,
  resCallBack,
  errCallback,
  progressCallBack,
  options = null
) {
  if (!file) {
    errCallback('文件不存在');
    return;
  } else if (!/\/(?:jpeg|png|gif|jpg)/i.test(file.type)) {
    errCallback('文件格式有误');
    return;
  } else if (file.size / (1024 * 1024) > 10) {
    /// /如果图片大于10m禁止上传
    errCallback('上传图片不能大于10m');
    return;
  }
  let Orientation; // 方向
  EXIF.getData(file, function () {
    Orientation = EXIF.getTag(this, 'Orientation');
  });
  const reader = new FileReader();
  reader.onload = function () {
    let img = new Image();
    img.src = this.result;
    file.src = this.result;
    // 如果图片小于200kb直接上传
    if (file.size / 1024 < 200) {
      uploadHandler(file);
      return;
    }
    if (img.complete) {
      callback();
    } else {
      img.onload = callback;
    }

    function callback() {
      const blob = imageCompress(
        img,
        file.size / (1024 * 1024),
        options,
        Orientation
      );
      uploadHandler(blob);
      img = null;
    }
  };
  reader.readAsDataURL(file);

  /**
   * 图片压缩
   * @param img 图片
   * @param size 图片文件大小
   * @param options 配置 {width,height,quality}可以只写宽度，会等比例缩放 quality:图片质量 默认为0.7
   * @param Orientation 方向
   */
  function imageCompress(img, size, options, Orientation) {
    let width = img.width;
    let height = img.height;
    const scale = width / height;
    let quality = size > 5 ? 0.3 : 0.7; // 图片小于于5m,图片质量默认为0.7，大于5m,图片质量为0.3
    width = (options && options.width) || width;
    height = (options && options.height) || width / scale;
    let ratio;
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    if ((ratio = (width * height) / 4000000) > 1) {
      ratio = ~~Math.sqrt(ratio);
      width = ~~(width / ratio);
      height = ~~(height / ratio);
    } else {
      ratio = 1;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#fff'; // canvas存在透明区域的话，当转成jpg的时候透明区域会变成黑色,解决办法就是绘制之前在canvas上铺一层白色的底色
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 如果图片像素大于100万则使用瓦片绘制
    let count;
    const tCanvas = document.createElement('canvas');
    const tctx = tCanvas.getContext('2d');
    if ((count = (width * height) / 1000000) > 1) {
      count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
      // 计算每块瓦片的宽和高
      const nw = ~~(width / count);
      const nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(
            img,
            i * nw * ratio,
            j * nh * ratio,
            nw * ratio,
            nh * ratio,
            0,
            0,
            nw,
            nh
          );
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    // 修复ios上传图片的时候 被旋转的问题
    if (Orientation !== '' && Orientation !== 1) {
      switch (Orientation) {
        case 6: // 需要顺时针（向左）90度旋转
          rotateImg(img, 'left', canvas);
          break;
        case 8: // 需要逆时针（向右）90度旋转
          rotateImg(img, 'right', canvas);
          break;
        case 3: // 需要180度旋转
          rotateImg(img, 'right', canvas); // 转两次
          rotateImg(img, 'right', canvas);
          break;
      }
    }
    if (
      options &&
      options.quality &&
      options.quality <= 1 &&
      options.quality > 0
    ) {
      quality = options.quality;
    }
    const base64 = canvas.toDataURL('image/jpeg', quality);
    const blob = convertBase64UrlToBlob(base64);
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    // canvas.width = canvas.height = 0;
    blob.src = base64;
    return blob;
  }

  /**
   * 将以base64的图片url数据转换为Blob
   * @param urlData 用url方式表示的base64图片数据
   */
  function convertBase64UrlToBlob(urlData) {
    const text = window.atob(urlData.split(',')[1]);
    const buffer = new ArrayBuffer(text.length);
    const ubuffer = new Uint8Array(buffer);
    const Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
    let blob;
    for (let i = 0; i < text.length; i++) {
      ubuffer[i] = text.charCodeAt(i);
    }
    if (Builder) {
      const builder = new Builder();
      builder.append(buffer);
      blob = builder.getBlob('image/jpeg');
    } else {
      blob = new window.Blob([buffer], { type: 'image/jpeg' });
    }
    return blob;
  }

  /**
   *旋转图片
   * @param img 图片
   * @param direction 方向
   * @param canvas
   */
  function rotateImg(img, direction, canvas) {
    // 最小与最大旋转方向，图片旋转4次后回到原方向
    const min_step = 0;
    const max_step = 3;
    if (img == null) return;
    // img的高度和宽度不能在img元素隐藏后获取，否则会出错
    const height = img.height;
    const width = img.width;
    let step = 2;
    if (step == null) {
      step = min_step;
    }
    if (direction === 'right') {
      step++;
      // 旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
    } else {
      step--;
      step < min_step && (step = max_step);
    }
    // 旋转角度以弧度值为参数
    const degree = (step * 90 * Math.PI) / 180;
    const ctx = canvas.getContext('2d');
    switch (step) {
      case 0:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);
        break;
      case 1:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, 0, -height);
        break;
      case 2:
        canvas.width = width;
        canvas.height = height;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, -height);
        break;
      case 3:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, 0);
        break;
    }
  }

  // 文件上传
  async function uploadHandler(file) {
    const form = new FormData();
    form.append('file', file, 'cjpic' || file.name);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        progressCallBack(
          Number((progressEvent.loaded / progressEvent.total) * 100 || 0)
        );
      },
    };
    const url = process.env.VUE_APP_BASE_API + '/public/upload/as_open/file';
    try {
      const res = await request.$instance.post(url, form, config);
      resCallBack(res, file.src);
    } catch (e) {
      errCallback(e);
      console.log('文件上传', e);
    }
  }
}

export function throttle(func, wait, options) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true;
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

export function debounce(func, wait, immediate) {
  // immediate默认为false
  var timeout, args, context, timestamp, result;

  var later = function () {
    // 当wait指定的时间间隔期间多次调用debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    // 第一次调用该方法时，且immediate为true，则调用func函数
    var callNow = immediate && !timeout;
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * 判断两个对象是否相等
 * @param obj1 对象1
 * @param obj2 对象2
 * @returns {boolean|*}
 */
export function diffObject(obj1, obj2) {
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object;
    var t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diffObject(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
}

/***
 * 判断机型是否为iPhone X 系列
 * @returns {boolean}
 */
export function isIphoneXSeries() {
  if (typeof window !== 'undefined' && window) {
    return (
      /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
    );
  }
  return false;
}
