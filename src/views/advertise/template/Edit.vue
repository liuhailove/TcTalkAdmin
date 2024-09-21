<template>
  <div id="app">
    <ckeditor
        v-model="editorData"
        :editor="editor"
        :config="editorConfig"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Code,
  FontColor,
  FontBackgroundColor,
  FontFamily,
  FontSize,
  Heading,
  Link,
  BlockQuote,
  CodeBlock,
  List,
  TodoList,
  Indent,
  Undo,
  Essentials,
  Paragraph,
  ClassicEditor,
  Image,
  ImageInsert,
  ImageCaption,
  ImageUpload,
  ImageToolbar,
  ImageStyle,
  ImageResize,
  Table,
  TableToolbar,
  TextTransformation,
  Alignment,
} from 'ckeditor5'; // 移除了 SlashCommand 和 premium features
import {Ckeditor} from '@ckeditor/ckeditor5-vue';

import 'ckeditor5/ckeditor5.css';
import {ref} from "vue"; // 只保留基础的 ckeditor 样式

// 定义编辑器的实例和配置
const editor = ClassicEditor;

// 初始化编辑器的数据和配置
const editorData = ref('<p>Hello from CKEditor 5 in Vue!</p>');
const editorConfig = {
  plugins: [Bold, Essentials, Italic, Paragraph, Undo, Italic, Strikethrough, Subscript, Superscript, Code, FontColor, FontBackgroundColor,
    FontFamily, FontSize, Heading, Link, BlockQuote, CodeBlock, List, TodoList,
    Indent, Image, ImageInsert, ImageCaption, ImageUpload, ImageToolbar, ImageStyle, ImageResize,
    Table, TableToolbar, TextTransformation, Alignment,], // 引入需要的插件
  toolbar: ['undo', 'redo',
    '|',
    'heading',
    '|',
    'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
    '|',
    'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
    '|',
    'link', 'uploadImage', 'blockQuote', 'codeBlock',
    '|',
    'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
    '|',
    'imageInsert',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
  ], // 工具栏按钮

  height: 300 // 通过配置设置高度
};
</script>
