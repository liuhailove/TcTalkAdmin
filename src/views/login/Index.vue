<template>
  <div>

    <el-card class="login-form-layout">
      <el-form aria-autocomplete="inline"
               :model="loginForm"
               :rules="loginRules"
               ref="loginFormRef"
               label-position="left">
        <div style="text-align:center">
          <svg-icon icon-class="login-mall" style="width:56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">TCTalk Admin</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autocomplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autocomplete="on"
                    placeholder="请输入密码">
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>/
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align:center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button style="width: 45%" type="primary" @click.native.prevent="handleTry">
            获取体验账号
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
    <el-dialog
        title="公众号二维码"
        :visible.sync="dialogVisible"
        :show-close="false"
        :center="true"
        width="30%">
      <div style="text-align: center">
        <span class="font-title-large"><span class="color-main font-extra-large">关注公众号</span>回复<span
            class="color-main font-extra-large">体验</span>获取体验账号</span>
        <br>
        <img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg" width="160"
             height="160" style="margin-top: 10px">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {isvalidUsername} from "@/utils/validate.ts";
import login_center_bg from '@/assets/images/login_center_bg.png'

import {ref} from "vue";
import {setCookie, setSupport} from "@/utils/support.ts";
import {useRouter} from "vue-router";
import {UserInfo} from "@/model/user_info.ts";
import {userStore} from "@/store/user_store.ts";
import SvgIcon from "@/components/SvgIcon/Index.vue";
import * as CryptoJS from 'crypto-js';

// 设置token值
const {login} = userStore();
const router = useRouter()
const loginForm = ref<UserInfo>({
  username: '',
  password: '',
});

const loginFormRef = ref(null);
const loading = ref(false);
const dialogVisible = ref(false);
const pwdType = ref('password');
const showPwd = () => {
  if (pwdType.value === 'password') {
    pwdType.value = '';
  } else {
    pwdType.value = 'password';
  }
}
const validateUsername = (_, value, callback) => {
  if (!isvalidUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
};
const validatePass = (_, value, callback) => {
  if (value.length < 3) {
    callback(new Error('密码不能小于3位'))
  } else {
    callback()
  }
};

const loginRules = ref({
  username: [{required: true, trigger: 'blur', validator: validateUsername}],
  password: [{required: true, trigger: 'blur', validator: validatePass}]
});

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      let password = CryptoJS.MD5(loginForm.value.password).toString();
      login({username: loginForm.value.username, password: password})
          .then(() => {
            loading.value = false;
            setCookie('username', loginForm.value.username, 15);
            setCookie('password', password, 15);
            router.push({path: '/'});
          })
          .catch(() => {
            loading.value = false;
          });
    } else {
      console.log('参数验证不合法！');
      return false;
    }
  });
}

const handleTry = () => {
  dialogVisible.value = true;
}

const dialogConfirm = () => {
  dialogVisible.value = true;
  setSupport(true);
}

</script>
<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409EFF;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}


</style>