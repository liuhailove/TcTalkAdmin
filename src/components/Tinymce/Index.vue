<template>
  <editor
      api-key="no-api-key"

      height="200"
      width="200"
      :init="{
      license_key: 'gpl',
      menubar: false
    }"
  />
  <div class="editor-custom-btn-container">
    <EditorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></EditorImage>
  </div>
</template>
<script setup lang="ts">
import tinymce from "tinymce/tinymce";
import "tinymce/icons/default/icons";
import "tinymce/models/dom"; // 一定要引入
import "tinymce/themes/silver"; // 界面UI主题
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 文字计数
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/emoticons"; // emoji表情
import "tinymce/plugins/emoticons/js/emojis.js"; //必须引入这个文件才有表情图库
import "tinymce/plugins/code"; // 编辑源码
import "tinymce/plugins/link"; // 链接插件
import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/codesample"; //代码示例
import "tinymce/plugins/autoresize"; // 自动调整编辑器大小
import "tinymce/plugins/quickbars"; // 光标处快捷提示
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/searchreplace"; //查找替换
import "tinymce/plugins/autolink"; //自动链接
import "tinymce/plugins/directionality"; //文字方向
import "tinymce/plugins/visualblocks"; //显示元素范围
import "tinymce/plugins/visualchars"; //显示不可见字符
import "tinymce/plugins/charmap"; // 特殊符号
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/insertdatetime"; //插入日期时间
import "tinymce/plugins/importcss"; //引入自定义样式的css文件
import "tinymce/plugins/accordion"; // 可折叠数据手风琴模式
import "tinymce/plugins/anchor"; //锚点
import "tinymce/plugins/fullscreen";

import Editor from '@tinymce/tinymce-vue';
import {onMounted, ref} from "vue";
import EditorImage from "@/components/Tinymce/components/EditorImage.vue";

const content = ref();
const toolbar = [
  'bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat code',
  'hr bullist numlist link image charmap preview anchor pagebreak fullscreen insertdatetime media table forecolor backcolor'
];

const tinymceConfig = ref({
  height: 500,
  language: 'zh_CN',
  body_class: 'panel-body ',
  toolbar: toolbar,
  menubar: false,
  object_resizing: false,
  plugins: [
    'advlist', 'anchor', 'autolink', 'autosave', 'code', 'codesample',
    'colorpicker', 'contextmenu', 'directionality', 'emoticons',
    'fullscreen', 'hr', 'image', 'imagetools', 'importcss', 'insertdatetime',
    'legacyoutput', 'link', 'lists', 'media', 'nonbreaking',
    'noneditable', 'pagebreak', 'paste', 'preview', 'print',
    'save', 'searchreplace', 'spellchecker', 'tabfocus', 'table',
    'template', 'textcolor', 'textpattern', 'visualblocks', 'visualchars', 'wordcount'
  ],
  end_container_on_empty_block: true,
  powerpaste_word_import: 'clean',
  code_dialog_height: 450,
  code_dialog_width: 1000,
  advlist_bullet_styles: 'square',
  advlist_number_styles: 'default',
  imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
  default_link_target: '_blank',
  link_title: false,
  // external_plugins: {
  //   // 确保为每一个插件指定本地路径
  //   'advlist': '/tinymce/plugins/advlist/plugin.min.js',
  //   'anchor': '/tinymce/plugins/anchor/plugin.min.js',
  //   'autolink': '/tinymce/plugins/autolink/plugin.min.js',
  //   'autosave': '/tinymce/plugins/autosave/plugin.min.js',
  //   'code': '/tinymce/plugins/code/plugin.min.js',
  //   'codesample': '/tinymce/plugins/codesample/plugin.min.js',
  //   'colorpicker': '/tinymce/plugins/colorpicker/plugin.min.js',
  //   'contextmenu': '/tinymce/plugins/contextmenu/plugin.min.js',
  //   'directionality': '/tinymce/plugins/directionality/plugin.min.js',
  //   'emoticons': '/tinymce/plugins/emoticons/plugin.min.js',
  //   'fullscreen': '/tinymce/plugins/fullscreen/plugin.min.js',
  //   'hr': '/tinymce/plugins/hr/plugin.min.js',
  //   'image': '/tinymce/plugins/image/plugin.min.js',
  //   'imagetools': '/tinymce/plugins/imagetools/plugin.min.js',
  //   'importcss': '/tinymce/plugins/importcss/plugin.min.js',
  //   'insertdatetime': '/tinymce/plugins/insertdatetime/plugin.min.js',
  //   'legacyoutput': '/tinymce/plugins/legacyoutput/plugin.min.js',
  //   'link': '/tinymce/plugins/link/plugin.min.js',
  //   'lists': '/tinymce/plugins/lists/plugin.min.js',
  //   'media': '/tinymce/plugins/media/plugin.min.js',
  //   'nonbreaking': '/tinymce/plugins/nonbreaking/plugin.min.js',
  //   'noneditable': '/tinymce/plugins/noneditable/plugin.min.js',
  //   'pagebreak': '/tinymce/plugins/pagebreak/plugin.min.js',
  //   'paste': '/tinymce/plugins/paste/plugin.min.js',
  //   'preview': '/tinymce/plugins/preview/plugin.min.js',
  //   'print': '/tinymce/plugins/print/plugin.min.js',
  //   'save': '/tinymce/plugins/save/plugin.min.js',
  //   'searchreplace': '/tinymce/plugins/searchreplace/plugin.min.js',
  //   'spellchecker': '/tinymce/plugins/spellchecker/plugin.min.js',
  //   'tabfocus': '/tinymce/plugins/tabfocus/plugin.min.js',
  //   'table': '/tinymce/plugins/table/plugin.min.js',
  //   'template': '/tinymce/plugins/template/plugin.min.js',
  //   'textcolor': '/tinymce/plugins/textcolor/plugin.min.js',
  //   'textpattern': '/tinymce/plugins/textpattern/plugin.min.js',
  //   'visualblocks': '/tinymce/plugins/visualblocks/plugin.min.js',
  //   'visualchars': '/tinymce/plugins/visualchars/plugin.min.js',
  //   'wordcount': '/tinymce/plugins/wordcount/plugin.min.js',
  // },
  // 本地加载 TinyMCE 核心文件路径
  script_url: '/tinymce/tinymce.min.js', // 指向本地的tinymce.min.js
  // 本地皮肤路径
  skin_url: '/tinymce/skins/ui/oxide', // 指向本地皮肤路径
  content_css: '/tinymce/skins/content/default/content.min.css', // 内容样式表路径
  init_instance_callback: editor => {
    editor.on('Change KeyUp SetContent', () => {
      content.value = editor.getContent();
    });
  },


});


//初始化编辑器
onMounted(() => {
  tinymce.init({});
});

</script>