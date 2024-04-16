<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Editor, RawEditorOptions } from 'tinymce';
const tinymceContainerRef = ref<HTMLTextAreaElement>();
const model = defineModel<string>();
const options: RawEditorOptions = {
  height: 500,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'help',
    'quickbars',
    'wordcount'
  ],
  toolbar:
    'undo redo | blocks | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  skin: 'vscode-dark',
  content_css: 'vscode-dark'
};
let tinymce: Editor[];
onMounted(() => {
  const tinymce_script = document.getElementById('tinymce-script');
  if (!tinymce_script) {
    const dom = document.createElement('script');
    dom.setAttribute('id', 'tinymce-script');
    dom.setAttribute('src', './tinymce/tinymce.min.js');
    document.body.appendChild(dom);
    console.log(tinymceContainerRef.value);
    dom.onload = async () => {
      initEditor();
    };
  } else {
    initEditor();
  }
});
async function initEditor() {
  options.target = tinymceContainerRef.value;
  tinymce = await window.tinymce.init(options);
  tinymce[0]
    .on('input', () => {
      model.value = tinymce[0].getContent();
    })
    .on('change', () => {
      model.value = tinymce[0].getContent();
    });
}
</script>
<template>
  <div class="Editor" ref="EditorRef">
    <textarea ref="tinymceContainerRef" v-model="model"></textarea>
  </div>
</template>
<style scoped lang="scss">
.Editor {
  width: 100%;
}
:deep(.tox-promotion) {
  display: none;
}
</style>
