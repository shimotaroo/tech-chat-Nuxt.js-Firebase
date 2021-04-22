<template>
  <transition appear>
    <div
      class="z-10 max-w-sm h-screen w-screen fixed top-0 flex flex-col items-center justify-center modal-wrap"
    >
      <!-- ここにModalの中身が入る -->
      <!-- slot を使うことで、このコンポーネントを使う側からこの <slot /> となっている箇所に指定した HTML を差し込むことができる -->
      <!-- 外側は共通で中身が違う Modal を作成出来る -->
      <slot />

      <!-- Modalを閉じるボタン -->
      <button @click="$emit('closeModal')">
        <i class="material-icons text-white text-5xl">
          clear
        </i>
      </button>
    </div>
  </transition>
</template>

<style scoped>
/* transition では v- から始まるクラスを使ってtransition タグで囲われた要素の状態を設定することが出来る
v-enter というのが要素が追加される前の style
v-enter-to は要素が追加された後の style
v-enter-active は要素が追加されている間の style
参考：https://v1-jp.vuejs.org/guide/transitions.html */

.v-leave-active,
.v-enter-active {
  transition: opacity 0.4s ease-out;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.vleave {
  opacity: 1;
}
</style>
