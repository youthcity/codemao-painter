<template>
    <div class="tools-costume">
        <input title="造型名称" class="costume-title" placeholder="请输入造型名称" v-model="costumeTitle"/>
        <div class="costume-buttons">
            <div class="save-button">
                <img src="//o44j7l4g3.qnssl.com/program/painter/save.png" alt="保存" @click="save">
            </div>
            <div class="cancel-button">
                <img src="//o44j7l4g3.qnssl.com/program/painter/cancel.png" alt="取消" @click="cancel">
            </div>
        </div>
    </div>
</template>
<style scoped>
    .tools-costume {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        background: #E1D6BE;
    }

    .costume-title {
        margin: 0.5rem;
        padding: 0.5rem;
        background: #ECE2CA;
        border: 1px solid #DDD0C3;
        border-radius: 4px;
        font-family: STHeitiSC-Light,serif;
        font-size: 14px;
        color: #6D4C41;
    }

    .costume-title:focus {
        outline: none;
    }

    .costume-buttons {
        display: flex;
        justify-content: space-between;

        margin:0 0.5rem;

        cursor: pointer;
    }

    .costume-buttons img {
        max-width:100%;
        max-height: 100%;
    }


</style>
<script>
    export default{
        data(){
            return {
            }
        },
        computed: {
            costumeTitle: {
                get() {
                    return this.$root.painter.store.state.costumeTitle;
                },
                set(newValue) {
                    this.$root.painter.store.setCostumeName(newValue);
                }
            }

        },
        methods: {
            save() {
                this.$dispatch('painter-save');
            },
            cancel() {
                this.$dispatch('painter-cancel');
            },
        }
    }
</script>