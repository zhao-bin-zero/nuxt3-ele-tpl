<!-- form 初始化 格式参考 TaskFormFieldsDataType -->
<template>
  <div>
    <el-form
      v-if="Object.keys(taskFormCon).length"
      ref="taskForm"
      :model="taskFormCon"
      class="task-form"
      :class="taskFormClass"
      :rules="taskFormRules"
      :label-width="labelWidth"
    >
      <template v-for="task in formfieldsHtml">
        <div
          v-if="task.type === 'title'"
          :key="task.id"
          class="task-form__title"
          :class="`text-${task.display?.align || 'left'}`"
        >
          {{ taskFormCon[task.id] || (task.textValue ? task.textValue(taskFormCon) : '') }}
        </div>
        <el-form-item v-else-if="!task.display?.hided" :key="task.id + '0'" :label="task.label + ':'" :prop="task.id">
          <p v-if="task.type === 'text'">
            {{ taskFormCon[task.id] || (task.textValue ? task.textValue(taskFormCon) : '--') }}
          </p>
          <el-select
            v-if="task.type === 'enum' && (task.enumOptions || task.enumGroupOptions)"
            v-model="taskFormCon[task.id]"
            clearable
            filterable
            :multiple="task.display?.multiAnswer"
            :disabled="task.display?.disabled"
            :placeholder="task.display?.placeholder || 'Please select'"
            @change="valueChange(task)"
          >
            <template v-if="task.enumGroupOptions">
              <el-option-group
                v-for="(group, label) in task.enumGroupOptions"
                :key="label"
                :label="(task.display?.enumGroupLabel && task.display?.enumGroupLabel(label)) || group.label"
              >
                <el-option
                  v-for="(item, index) in group?.options || group"
                  :key="index"
                  :label="(task.display?.enumLabel && task.display?.enumLabel(item)) || item.label"
                  :value="(task.display?.enumValue && task.display?.enumValue(item)) || item.value"
                />
              </el-option-group>
            </template>
            <template v-if="task.enumOptions">
              <el-option
                v-for="(key, value) in task.enumOptions"
                :key="value"
                :label="(task.display?.enumLabel && task.display?.enumLabel(key)) || key.label || key"
                :value="
                  (task.display?.enumValue && task.display?.enumValue(key)) ||
                  (task.display?.valueType === 'number' ? +(key.value || value) : key.value || value)
                "
              />
            </template>
          </el-select>
          <el-upload
            v-if="task.type === 'upload'"
            ref="`taskFormUpload${task.id}`"
            class="task-form__upload"
            :with-credentials="false"
            :headers="taskFormUploadHeaders"
            :file-list="taskFormCon[task.id]"
            :action="`${useRuntimeConfig().public.BASE_URL}${task?.file?.path || '/workflow/file'}`"
            :before-remove="beforeRemove"
            :on-remove="
              (file, fileList) => {
                handleRemove(file as FileType, fileList as FileType[], task)
              }
            "
            :before-upload="beforeUpload"
            :on-exceed="
              (files, fileList) => {
                handleExceed(files, fileList, task)
              }
            "
            :on-change="
              (file, fileList) => {
                handleChange(file, fileList, task)
              }
            "
            :on-success="
              (response, file, fileList) => {
                handleSuccess(response, file, fileList, task)
              }
            "
            :on-error="
              (err, file, fileList) => {
                handleError(err, file, fileList, task)
              }
            "
            :data="{ fileType: task?.file?.fileType }"
            :accept="task?.file?.contentType"
            :list-type="(task?.file?.contentType || '').includes('image') ? 'picture' : 'text'"
            :multiple="task.display?.multiAnswer"
            :disabled="task.display?.disabled"
            :limit="task?.file?.fileLimit"
          >
            <el-button v-if="!task.display?.disabled" class="btn btn-primary">Choose</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传{{ task.file.type }}文件</div> -->
          </el-upload>
          <template v-if="task.type === 'string'">
            <!-- <bms-tinymce-editor v-if="task.display.richText" v-model="taskFormCon[task.id]" :disabled="task.display.disabled" /> -->
            <el-input
              v-model="taskFormCon[task.id]"
              :type="task.display?.textArea ? 'textarea' : 'text'"
              :rows="2"
              :maxlength="task.constraints?.maxlength"
              :disabled="task.display?.disabled"
              :placeholder="task.display?.placeholder || 'Please input'"
              :show-word-limit="task.display?.textArea"
              @change="valueChange(task)"
            />
          </template>
          <el-input-number
            v-if="task.type === 'number'"
            v-model="taskFormCon[task.id]"
            :step="task.constraints?.step"
            :max="task.constraints?.max"
            :min="task.constraints?.min"
            :disabled="task.display?.disabled"
            :placeholder="task.display?.placeholder || 'Please input'"
            @change="valueChange(task)"
          />
          <!-- value-format除了x外无法设置默认值 -->
          <el-date-picker
            v-if="task.type === 'timestamp'"
            v-model="taskFormCon[task.id]"
            type="datetime"
            value-format="x"
            :disabled="task.display?.disabled"
            :placeholder="task.display?.placeholder || 'Please select date'"
          />
          <el-switch v-if="task.type === 'boolean'" v-model="taskFormCon[task.id]" :disabled="task.display?.disabled" />
          <!-- 目前只有文本输入框 -->
          <template v-if="task.type === 'tab' && task.list">
            <el-tabs v-model="task.defaultValue" class="bms-tabs" type="card">
              <el-tab-pane v-for="t in task.list" :key="t.id" :label="t.label" :name="t.id">
                <el-form-item :prop="t.id">
                  <!-- <bms-tinymce-editor v-if="t.display?.richText" v-model="taskFormCon[t.id]" :disabled="t.display?.disabled" /> -->
                  <el-input
                    v-model="taskFormCon[t.id]"
                    :type="t.display?.textArea ? 'textarea' : 'text'"
                    :rows="4"
                    :max="t.constraints?.max"
                    :min="t.constraints?.min"
                    :maxlength="task.constraints?.maxlength"
                    :disabled="t.display?.disabled"
                    :placeholder="t.display?.placeholder || 'Please input'"
                    :show-word-limit="t.display?.textArea"
                  />
                  <p v-if="t.display?.reminder" class="el-form-item__notification">{{ t.display.reminder }}</p>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
          </template>
          <p v-if="task.display?.reminder" class="el-form-item__notification">{{ task.display.reminder }}</p>
        </el-form-item>
      </template>
    </el-form>
    <!-- <div class="pd-tp-10 text-right">
      <el-button  class="btn btn-primary" @click="checkSubmit()">Submit</el-button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
  import { FileType, ObjectType, TaskFormFieldsDataType } from '@/common/types'
  import { isString } from '@/common/is'
  import { FormInstance, UploadFile, UploadFiles, UploadRawFile, UploadUserFile } from 'element-plus'
  import { klona } from 'klona'
  import { useUserStore } from '~/stores/user'

  const props = withDefaults(
    defineProps<{
      taskFormfields: TaskFormFieldsDataType[]
      taskFormClass?: string
      labelWidth?: string
      taskFormParams?: ObjectType<any>
    }>(),
    {
      taskFormfields: () => [],
      taskFormParams: () => ({}),
      labelWidth: '180px'
    }
  )
  const emits = defineEmits(['submitForm'])

  const taskForm = ref<FormInstance>()
  // const allFormfieldsObj = ref<ObjectType<TaskFormFieldsDataType>>({}) // 所有的form格式，有重复, 未来用于传入changeInit
  const formfieldsObj = ref<ObjectType<TaskFormFieldsDataType>>({}) // 平铺的form数据
  const formfieldsObjValues = computed(() => Object.values(formfieldsObj.value))
  const formfieldsObj2 = ref<ObjectType<TaskFormFieldsDataType>>({}) // 处理后的form数据
  const taskFormCon = ref<ObjectType<any>>({}) // 提交的数据
  const taskFormRules = ref<ObjectType<ObjectType<any>[]>>({}) // 提交的规则

  const formfieldsObj2Init = () => {
    formfieldsObj2.value = {}
    formfieldsObjValues.value.forEach((field) => {
      if (field.display?.tab) {
        if (formfieldsObj2.value[field.display?.tab]) {
          formfieldsObj2.value[field.display.tab].list!.push(field)
        } else {
          formfieldsObj2.value[field.display.tab] = {
            id: field.display.tab,
            label: field.display.tab,
            type: 'tab',
            defaultValue: field.id,
            constraints: {},
            display: { ...field.display, reminder: '' },
            list: [field]
          }
        }
      } else {
        formfieldsObj2.value[field.id] = field
      }
    })
  }
  const formfieldsHtml = computed(() => {
    return Object.values(formfieldsObj2.value).sort(
      (a: TaskFormFieldsDataType, b: TaskFormFieldsDataType) => a.display?.order || 0 - (b.display?.order || 0)
    )
  })

  const fieldValueIsArray = (field: TaskFormFieldsDataType) => {
    return field.display?.multiAnswer || field.type === 'upload'
  }

  const taskFormConInit = () => {
    taskFormCon.value = {}
    // console.log('this.formfields', this.formfields)
    formfieldsObjValues.value.forEach((field) => {
      let val =
        field.defaultValue === '' || field.defaultValue === undefined ? props.taskFormParams[field.id] : field.defaultValue
      if (val) {
        if (fieldValueIsArray(field)) {
          if (isString(val)) {
            val = val.split(',')
            if (field.type === 'upload') {
              val = val.map((id: string) => ({ name: id, id, url: '' }))
            }
          }
        }
      } else {
        if (fieldValueIsArray(field)) {
          val = []
        } else if (field.type === 'boolean') {
          val = false
        }
      }
      // console.log('val', val)
      taskFormCon.value[field.id] = val
    })
  }

  // 正则生成
  watch(
    formfieldsObjValues,
    (n) => {
      taskFormRules.value = {}
      n.forEach((field) => {
        taskFormRules.value[field.id] = []
        // 必填校验
        if (field.constraints?.required) {
          taskFormRules.value[field.id].push({
            required: true,
            message: `${field.label} is required.`,
            trigger: 'change'
          })
        }
        // 大小校验
        if (field.constraints?.min || field.constraints?.max) {
          taskFormRules.value[field.id].push({
            type: 'number',
            min: field.constraints?.min,
            max: field.constraints?.max,
            message: `Greater than ${field.constraints?.min || 0} is less than ${field.constraints?.max || 'n'}.`,
            trigger: 'change'
          })
        }
        // 长度校验
        const maxLength = field.constraints?.maxlength || field.file?.fileLimit
        if (maxLength || field.constraints?.minlength) {
          taskFormRules.value[field.id].push({
            type: fieldValueIsArray(field) ? 'array' : 'string',
            min: field.constraints?.minlength,
            max: maxLength,
            message: `The length is between ${field.constraints?.minlength || 1} and ${maxLength || 'n'} ${
              fieldValueIsArray(field) ? '' : 'characters'
            }.`,
            trigger: 'change'
          })
        }
        // 正则校验
        if (field.display?.regex) {
          taskFormRules.value[field.id].push({
            pattern: field.display.regex,
            message: field.display.errorTip,
            trigger: 'change'
          })
        }
      })

      // nextTick(() => {
      //   setTimeout(() => {
      //     taskForm.value?.clearValidate()
      //   })
      // })
    },
    { deep: true }
  )

  watch(
    () => props.taskFormfields,
    (n) => {
      // visibleInit()
      formfieldsObj.value = ArrayToObj(n, 'id', true)
      formfieldsObj2Init()
      taskFormConInit()
    },
    { immediate: true, deep: true }
  )

  const valueChange = (field: TaskFormFieldsDataType) => {
    field.changeInit && field.changeInit(taskFormCon.value, formfieldsObj2.value)
  }

  const taskSubmit = () => {
    const params = klona(taskFormCon.value)
    const variables = {} as ObjectType<any>
    formfieldsObjValues.value.forEach((field) => {
      if (field.constraints?.readonly) return
      // if (!params[field.id]) return
      let value = params[field.id]
      if (field.type === 'upload') {
        value = value.map((obj: FileType) => obj.id)
      }
      if (fieldValueIsArray(field)) {
        // value = value.join()
        if (field.display?.submitType === 'string') {
          value = value.join()
        }
      }
      if (field.display?.frontTab) {
        if (!variables[field.display?.frontTab]) {
          variables[field.display.frontTab] = {}
        }
        variables[field.display.frontTab][field.id] = value
      } else {
        variables[field.id] = value
      }
    })
    console.log(variables)
    emits('submitForm', variables)
  }
  const checkSubmit = () => {
    taskForm.value?.validate((valid: boolean) => {
      if (valid) {
        taskSubmit()
      }
    })
  }
  // 文件超出个数限制时的钩子
  const handleExceed = (files: File[], fileList: UploadUserFile[], task: TaskFormFieldsDataType) => {
    ElMessage.warning(
      `${task.file?.fileLimit} files maximum，${files.length} files is selected at this time，${
        files.length + fileList.length
      } files have been selected in total.`
    )
  }

  const beforeUpload = (file: UploadRawFile) => {
    console.log('beforeUpload', file)
    // const isJPG = file.type === 'image/jpeg'
    // const isLt2M = file.size / 1024 / 1024 < 2

    // if (!isJPG) {
    //   this.$message.error('上传头像图片只能是 JPG 格式!')
    // }
    // if (!isLt2M) {
    //   this.$message.error('上传头像图片大小不能超过 2MB!')
    // }
    // return isJPG && isLt2M
  }

  // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
  const beforeRemove = async (file: UploadFile) => {
    return ElMessageBox.confirm(`Be sure to remove the ${file.name}？`).then(
      () => true,
      () => false
    )
  }

  const handleRemove = (file: FileType, fileList: FileType[], task: TaskFormFieldsDataType) => {
    console.log('handleRemove', file, fileList, taskFormCon.value[task.id])
    taskFormCon.value[task.id].splice(
      taskFormCon.value[task.id].findIndex((obj: FileType) => obj.id === file.id),
      1
    )
  }

  // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
  const handleChange = (file: UploadFile, fileList: UploadFiles, task: TaskFormFieldsDataType) => {
    console.log('handleChange', file, fileList, taskFormCon.value[task.id])
  }

  // 文件上传成功时的钩子
  const handleSuccess = (response: any, file: UploadFile, fileList: UploadFiles, task: TaskFormFieldsDataType) => {
    console.log('handleSuccess', response, file, fileList, taskFormCon.value[task.id])
    if (response.code === 9200) {
      taskFormCon.value[task.id].push({
        id: response.data.id,
        name: response.data.id,
        url: file.url
      })
      taskForm.value?.validateField(task.id)
    } else {
      taskFormCon.value[task.id] = [...taskFormCon.value[task.id]]
      ElMessage.error(response.message)
    }
  }

  const handleError = (err: Error, file: UploadFile, fileList: UploadFiles, task: TaskFormFieldsDataType) => {
    console.log('handleError', err, file, fileList, taskFormCon.value[task.id])
    ElMessage.error(err.message)
  }

  const taskFormUploadHeaders = computed(() => {
    // 不能监听，token刷新后会报错
    // const token = useLocalStorage('vpx.ops._token.keycloak', '')
    const { token } = useUserStore()
    return {
      Authorization: token
    }
  })
  defineExpose({ checkSubmit })
</script>
<style lang="scss" scoped>
  // form样式路径 assets/styles/element_init/form.scss
</style>
