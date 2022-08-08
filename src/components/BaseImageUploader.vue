<template>
  <el-upload
    class="base-image-uploader"
    :class="{'show-preview': imageUrl}"
    accept="image/png;image/jpeg;"
    action=""
    :show-file-list="false"
    :before-upload="beforeUpload"
    :http-request="upload">
    <img v-if="imageUrl" :src="imageUrl" class="preview" />
    <el-icon v-else><Plus /></el-icon>
  </el-upload>
</template>

<script>
import { uploadImg } from '@/server/api'

export default {
  name: 'BaseImageUploader',
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  watch: {
    image (val) {
      if (val) {
        this.imageUrl = val
      }
    }
  },
  created () {
    if (this.image) {
      this.imageUrl = this.image
    }
  },
  methods: {
    beforeUpload (rawFile) {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        this.$message.error('Logo必须是 jpeg 或 png 格式!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    },
    upload (options) {
      const img = options.file
      if (img) {
        uploadImg({ file: options.file }).then(data => {
          this.imageUrl = URL.createObjectURL(img)
          this.$emit('success', data)
        }).catch(() => {
        })
      }
    }
  }
}
</script>

<style lang="less">
.base-image-uploader {
  width: 180px;
  height: 180px;
  .preview {
    display: block;
    width: 100%;
  }
  &.show-preview {
    .el-upload {
      overflow: visible !important;
    }
  }
  .el-upload {
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
  .el-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
</style>
