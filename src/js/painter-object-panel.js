export default {
  data() {
    return {
      currentColor: '#333',
      currentObjectType: this.$root.painter.store.state.currentObjectType,
      currentObject: this.$root.painter.store.state.currentObject,
      currentOpacity: 1,
    };
  },
  computed: {
    canvas() {
      return this.$root.canvas;
    },
    curObject() {
      return this.$root.painter.store.state.currentObject;
    },
    curObjectType() {
      return this.$root.painter.store.state.currentObjectType;
    },
    curGroup() {
      return this.$root.painter.store.state.currentGroup;
    },
    showText() {
      return this.curObjectType === 'text';
    },
//            curObject() {
//                if(this.context) {
//                    return this.context.currentObject;
//                }
//            },
//            curObjectType() {
//                if(this.context) {
//                    return this.context.currentObjectType;
//                }
//            },
    curColor: {
      get() {
        let color = this.currentColor;
        if (this.curObject) {
          switch (this.curObjectType) {
            case 'text':
              color = this.curObject.fill;
              break;
            case 'line':
              color = this.curObject.stroke;
              break;
            default:
              color = this.curObject.fill;
//                            color = this.currentColor;
          }
        }
        return color;
      },
      set(newValue) {
        if (this.curObject) {
          switch (this.curObjectType) {
            case 'text':
              this.curObject.fill = newValue;
              break;
            case 'line':
              this.curObject.stroke = newValue;
              break;
            default:
              this.curObject.fill = newValue;
          }
          this.currentColor = newValue;
          this.canvas.renderAll();
        }
      },
    },
    curFontSize: {
      get() {
        let fontSize;
        if (this.curObjectType === 'text' && this.curObject) {
          fontSize = this.curObject.fontSize;
        }
        return fontSize;
      },
      set(newValue) {
        if (this.curObjectType === 'text' && this.curObject) {
          this.curObject.fontSize = newValue;
          this.canvas.renderAll();
        }
      },
    },
    curText: {
      get() {
        let text;
        if (this.curObjectType === 'text' && this.curObject) {
          text = this.curObject.text;
        }
        return text;
      },
      set(newValue) {
        if (this.curObjectType === 'text' && this.curObject) {
          this.curObject.text = newValue;
          this.canvas.renderAll();
        }
      },
    },
    curOpacity: {
      get() {
        let opacity = this.currentOpacity;
        if (this.curObject) {
          opacity = this.curObject.opacity;
        }
        return opacity;
      },
      set(newValue) {
        if (this.curObject) {
          this.curObject.opacity = newValue;
          this.canvas.renderAll();
        }
        this.currentOpacity = newValue;
      },
    },
  },
  methods: {
    removeSelected() {
      const activeObject = this.curObject;
      const activeGroup = this.canvas.getActiveGroup();

      if (activeGroup) {
        const objectsInGroup = activeGroup.getObjects();
        this.canvas.discardActiveGroup();
        objectsInGroup.forEach((object) => {
          this.canvas.remove(object);
        });
      } else if (activeObject) {
        this.canvas.remove(activeObject);
      }
    },
  },
};
