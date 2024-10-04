<template>
    <div class="upload__container">
            <div class="upload__area">
                <div class="showUpload" v-if="image.length === 0 && !isDragging">
                    <div class="icon__upload"><font-awesome-icon icon="cloud-arrow-up" /></div>
                    <button class="josefin-sans-font" role="button" @click="selectImage">Choose Image to Upload</button>
                    <input type="file" hidden>
                    <button class="josefin-sans-font">Take a photo to Upload</button>
                    <p class="josefin-sans-font">or Drag and Drop image to Upload</p>
                </div>

                <div v-else-if="isDragging" class="showDrag">Drag Image Here</div>

                <!-- Section to show uploaded image and delete icon -->
                <div v-else class="showImage">
                    <img :src="image[0].url" alt="Uploaded Image" class="uploaded-image" />
                    <div class="icon_delete" @click="removeImage">
                    <font-awesome-icon :icon="['fas', 'circle-xmark']" />
                    </div>
                </div>

                <!-- Hidden file input for selecting images -->
                <input type="file" class="imageFile" ref="fileInput" @change="onImageSelect" />

                <button>Upload Image</button>
            </div>
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

        removeImage() {
            this.image = []; // Remove the uploaded image
        },

        uploadImage() {
            // Logic to upload the image to the server
            console.log("Image uploaded:", this.image[0]);
        }
    }
}
</script>


<style>
.upload__container {
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
}
</style>