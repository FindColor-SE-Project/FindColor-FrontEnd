<template>
    <!-- <div class="upload__container">
            <div class="upload__area">
                <div class="showUpload" v-if="image.length === 0 && !isDragging">
                    <div class="icon__upload"><font-awesome-icon icon="cloud-arrow-up" /></div>
                    <button class="josefin-sans-font" role="button" @click="selectImage">Choose Image to Upload</button>
                    <input type="file" hidden>
                    <button class="josefin-sans-font">Take a photo to Upload</button>
                    <p class="josefin-sans-font">or Drag and Drop image to Upload</p>
                </div>

                <div v-else-if="isDragging" class="showDrag" @dragover.prevent="onDragOver"
                @dragleave.prevent="onDragLeave" @drop.preven="onDrop">
                    Drag Image Here
                </div> -->

                <!-- Section to show uploaded image and delete icon -->
                <!-- <div v-else class="showImage">
                    <img :src="image[0].url" alt="Uploaded Image" class="uploaded-image" />
                    <div class="icon_delete" @click="deleteImage">
                    <font-awesome-icon :icon="['fas', 'circle-xmark']" />
                    </div>
                </div> -->

                <!-- Hidden file input for selecting images -->
                <!-- <input type="file" class="imageFile" ref="fileInput" @change="onImageSelect" />

                <button>Upload Image</button>
            </div>
    </div> -->

    <div class="upload__container">
        <div v-if="image.length === 0 " @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
            <div class="upload__area" v-if="!isDragging">
                <div>
                    <div class="icon__upload"><font-awesome-icon icon="cloud-arrow-up" /></div>
                    <button class="josefin-sans-font" role="button"  @click="selectImage">
                        Choose Image to Upload
                    </button>
                    <div>or Drag and Drop image to Upload</div>
                </div>
            </div>
            <div v-else-if="isDragging" class="showDrag">
                Drag Image Here
            </div>
            <input type="file" class="imageFile" ref="fileInput" @change="onImageSelect" />
        </div>        

        <div class="image__container" v-else>
            <div class="showImage">
                <span class="icon_delete" @click="deleteImage">&times;</span>
                <img :src="image[0].url" alt="Uploaded Image" class="uploaded-image" />
            </div>
        </div>
        <button class="upload__button">Upload</button>
    </div>
</template>

<script> 
export default{
    data() {
        return {
            image: [],
            isDragging: false
        }
    },

    methods: {
        selectImage() {
            this.$refs.fileInput.click();
        },

        onImageSelect(event) {
            const file = event.target.files[0]; // Get Only One Image
            if (!file || file.type.split("/")[0] != "image") return; // Verify that it is an image file
            
            // Delete Image File
            if (this.image.length > 0) {
                this.image.splice(0, 1);
            }

            this.image.push({
                name: file.name,
                url: URL.createObjectURL(file)
            });
        },

        deleteImage(i) {
            // this.image = []; // Remove the uploaded image
            this.image.splice(i, 1);
        },

        uploadImage() {
            // Logic to upload the image to the server
            console.log("Image uploaded:", this.image[0]);
        },

        onDragOver(event) {
            event.preventDefault();
            this.isDragging = true;
            event.dataTransfer.dropEffect = "copy";
        },

        onDragLeave(event) {
            event.preventDefault();
            this.isDragging = false;
        },

        onDrop(event) {
            event.preventDefault();
            this.isDragging = false;
            const file = event.target.files[0]; // Get Only One Image
            if (!file || file.type.split("/")[0] != "image") return; // Verify that it is an image file
            
            // Delete Image File
            if (this.image.length > 0) {
                this.image.splice(0, 1);
            }

            this.image.push({
                name: file.name,
                url: URL.createObjectURL(file)
            });
        }
    }
}
</script>


<style scoped>
/* .upload__container {
    height: 90vh;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
}

.upload__area {
    width: 850px;
    height: 500px;
    padding: 30px;
    text-align: center;
    border-radius: 20px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    border: #EDC2D8 dashed 5px;
}

.icon__upload {
    font-size: 70px;
    color: #8ABAD3;
}

button {
    font-size: 28px;
    margin: 5px 0;
    padding: 6px 10px;
    border: black solid 1px;
    border-radius: 20px;
    background-color: #EDC2D8;
}

p {
    font-size: 24px;
    margin: 5px 0;
}

button:hover {
    background-color: #FCF6F5;
} */

.upload__container {
    width: 100%;
    padding: 10%;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    overflow: hidden;
}

.upload__container .upload__button {
    outline: 0;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 13px;
    width: 100%;
    background: #EDC2D8;
}

.upload__container .upload__area {
    /* text-align: center; */
    height: 150px;
    border-radius: 5px;
    border: #EDC2D8 dashed 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: center;
    -webkit-user-select: none;
    margin-top: 10px;
}

.upload__container .selectDrag {
    color: #EDC2D8;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;
}

.upload__container .selectDrag:hover {
    opacity: 0.6;   
}

.upload__container .image__container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 200px;
    position: relative;
    margin-bottom: 8px;
}

.upload__container .image__container .showImage {
    width: 75px;
    margin-right: 5px;
    height: 75px;
    position: relative;
    margin-bottom: 8px;
}

.upload__container .image__container .showImage img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.upload__container .image__container .showImage div {
    position: absolute;
    top: -2px;
    right: 9px;
    font-size: 20px;
    cursor: pointer;
}

.upload__container input,
.upload__container .upload__area .on-drop,
.upload__container .upload__area.dropover .visible {
    display: none;
}

.icon_delete {
    z-index: 999;
    color: #EDC2D8;
}
</style>