export default {
  data() {
    return {
      currentColor: '#333',
      currentObjectType: this.$root.painter.store.state.currentObjectType,
      currentObject: this.$root.painter.store.state.currentObject,
      currentOpacity: 1,
      oldValue: null,
      oldTarget: null,
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
    isImage() {
      return this.curObjectType === 'image';
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
          let oldColor;
          switch (this.curObjectType) {
            case 'text':
              oldColor = this.curObject.fill;
              this.curObject.fill = newValue;
              break;
            case 'line':
              oldColor = this.curObject.stroke;
              this.curObject.stroke = newValue;
              break;
            default:
              oldColor = this.curObject.fill;
              this.curObject.fill = newValue;
          }
          this.currentColor = newValue;
          this.canvas.renderAll();
          if (oldColor !== newValue) {
            this.canvas.fire('color:changed',
              { target: this.curObject, oldColor, newColor: newValue });
          }
        }
      },
    },
    curFontSize: {
      get() {
        return this.$root.painter.store.state.currentFontSize;
      },
      set(newVal) {
        const newValue = parseInt(newVal);
        if (this.curObjectType === 'text' && this.curObject) {
          this.curObject.fontSize = newValue;
          this.canvas.renderAll();
        }
        this.$root.painter.store.state.currentFontSize = newValue;
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
        let opacity = this.oldOpacity;
        if (this.currentOpacity) {
          opacity = this.currentOpacity;
        }
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
    oldOpacity() {
      return this.$root.painter.store.state.objectOpacity;
    },
  },
  methods: {
    removeSelected() {
      const activeObject = this.curObject;
      const activeGroup = this.canvas.getActiveGroup();
      let objectsInGroup;

      if (activeGroup) {
        objectsInGroup = activeGroup.getObjects();
        this.canvas.discardActiveGroup();
        objectsInGroup.forEach((object) => {
          this.canvas.remove(object);
        });
      } else if (activeObject) {
        this.canvas.remove(activeObject);
      }

      this.canvas.fire('selected:removed', { group: objectsInGroup, object: activeObject });
    },
    fireOpacityChanged() {
      if (this.oldOpacity !== this.currentOpacity) {
        this.canvas.fire('opacity:changed',
          { target: this.curObject, oldValue: this.oldOpacity, newValue: this.currentOpacity });
      }
    },
    getOldFontSize() {
      this.oldFontSize = this.curFontSize;
      this.oldTarget = this.curObject;
    },
    getOldValue(event) {
      this.oldValue = event.target.value;
      this.oldTarget = this.curObject;
    },
    fireFontSizeChanged() {
      if (this.oldFontSize !== this.curFontSize) {
        this.canvas.fire('fontSize:changed',
          {
            target: this.oldTarget ? this.oldTarget : this.curObject,
            oldValue: this.oldValue,
            newValue: this.curFontSize,
          });
      }
    },
    fireTextChanged() {
      if (this.oldValue !== this.curText) {
        this.canvas.fire('text:changed',
          {
            target: this.oldTarget ? this.oldTarget : this.curObject,
            oldValue: this.oldValue,
            newValue: this.curText,
          });
      }
    },
  },
};
