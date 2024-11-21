<script>
export default {
  emits: ['color-clicked'],
  methods: {
    emitColorClick(isClicked) {
        console.log("logic check");
      this.$emit('color-clicked', isClicked);
    },
  },
};
</script>
