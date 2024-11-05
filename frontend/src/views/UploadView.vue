<template>
    <div class="upload__container">
        <div v-if="!isCameraOpen && image.length === 0" @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
            <div class="upload__area" v-if="!isDragging">
                <div>
                    <!-- 1 Choose Image From Device -->
                    <div class="icon__upload"><font-awesome-icon icon="cloud-arrow-up" /></div>
                    <button class="josefin-sans-font select_button" role="button" @click="selectImage">
                        Choose Image to Upload
                    </button>

                    <!-- 2 Take a photo -->
                    <div>
                        <button v-if="!isCameraOpen" class="josefin-sans-font select_button" role="button" @click="toggleCamera">
                            Take a photo to Upload
                        </button>
                    </div>

                    <!-- 3 Drag and Drop -->
                    <div class="josefin-sans-font messageDrag">or Drag and Drop image to Upload</div>
                </div>
            </div>
            <div v-if="isDragging" class="josefin-sans-font showDrag">
                Drag Image Here
            </div>
            <input type="file" class="imageFile" ref="fileInput" @change="onImageSelect" />
        </div>        

        <!-- If Camera open -->
        <div v-if="isCameraOpen">
            <button class="close_button" role="button" @click="toggleCamera">
                <span class="josefin-sans-font">Close Camera</span>
            </button>
            
            <div v-show="isCameraOpen && isLoading" class="camera-loading">
                <ul class="loader-circle">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            
            <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
                <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
                <video v-show="!isPhotoTaken" ref="camera" width="500" height="600" autoplay></video>
                <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" width="500" height="600"></canvas>
            </div>

            
            <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
                <button type="button" class="camera-button" @click="takePhoto">
                    <font-awesome-icon :icon="['fas', 'camera']" />                
                </button>
            </div>
        </div>

        <!-- Display Image -->
        <div class="image__container" v-if="image.length > 0">
            <div class="showImage">
                <span class="icon_delete" @click="deleteImage(0)">&times;</span>
                <img :src="image[0].url" alt="Uploaded Image" class="uploaded-image" />
            </div>
        </div>

        <!-- Upload Button -->
        <button class="josefin-sans-font upload__button" v-if="image.length > 0 || isPhotoTaken" @click="uploadImage">Upload</button>
    </div>
</template>

<script> 
import axios from 'axios';
import swal from 'sweetalert';

export default{
    data() {
        return {
            image: [],
            isDragging: false,
            // For Camera
            isCameraOpen: false,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            link: '#'
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
                url: URL.createObjectURL(file),
                file: file // เก็บ file object ไว้ใน image array
            });
        },

        deleteImage(i) {
            if (i !== undefined) {
                this.image.splice(i, 1); // ลบภาพที่มี index ที่กำหนด
            } else {
                this.image = []; // ลบทุกภาพ
            }
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
            const file = event.dataTransfer.files[0]; // Get Only One Image
            if (!file || file.type.split("/")[0] != "image") {
                alert('Please drop a valid image file.');
                return; // Verify that it is an image file
            }
            
            // Delete Image File
            this.image = [];
            this.image.push({
                name: file.name,
                url: URL.createObjectURL(file),
                file: file // Store file object
            });
        },

        toggleCamera() {
            if (this.isCameraOpen) {
                this.isCameraOpen = false;
                this.isPhotoTaken = false;
                this.isShotPhoto = false;
                this.stopCameraStream();
            }
            else {
                this.isCameraOpen = true;
                this.createCameraElement();
            }
        },

        createCameraElement() {
            this.isLoading = true;

            const constraints = (window.constraints = {
                audio: false,
                video: true
            });

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    this.isLoading = false;
                    alert("May the browser didn't support it, or there are some errors.");
                });
        },

        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });
        },

        takePhoto() {
            if (!this.isPhotoTaken) {
                this.isShotPhoto = true;

                const flash_timeout = 50;

                setTimeout(() => {
                    this.isShotPhoto = false;
                }, flash_timeout);
            }

            this.isPhotoTaken = !this.isPhotoTaken;

            const videoElement = this.$refs.camera;
            const canvasElement = this.$refs.canvas;
            const context = canvasElement.getContext('2d');

            // ตั้งค่าขนาด canvas
            canvasElement.width = 500;
            canvasElement.height = 600;

            const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
            const canvasAspectRatio = canvasElement.width / canvasElement.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (videoAspectRatio > canvasAspectRatio) {
                drawHeight = canvasElement.height;
                drawWidth = drawHeight * videoAspectRatio;
                offsetX = (canvasElement.width - drawWidth) / 2; 
                offsetY = 0;
            } else {
                drawWidth = canvasElement.width;
                drawHeight = drawWidth / videoAspectRatio;
                offsetX = 0;
                offsetY = (canvasElement.height - drawHeight) / 2;
            }

            context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight, offsetX, offsetY, drawWidth, drawHeight);
        },

        uploadImage() {
            let fileToUpload;

            if (this.isPhotoTaken) {
                // ถ้าถ่ายภาพจากกล้อง ใช้ข้อมูลจาก canvas
                const canvas = this.$refs.canvas;
                canvas.toBlob((blob) => {
                    if (!blob) {
                        alert('No file selected');
                        return;
                    }

                    fileToUpload = blob;
                    this.uploadFromDevice(fileToUpload);
                }, 'image/jpeg');
            } else if (this.image.length > 0) {
                // ถ้าผู้ใช้เลือกไฟล์จากอุปกรณ์ ใช้ข้อมูลจาก image array
                fileToUpload = this.image[0].file;
                this.uploadFromDevice(fileToUpload);
            } else {
                alert('No file selected');
            }
        },

        uploadFromDevice(file) {
            const formData = new FormData();
            formData.append('file', file, 'image.jpeg');

            axios.post('http://localhost:8000/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                swal({
                    title: "Upload Successful!",
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                    className: "success-alert"
                });
                this.isPhotoTaken = false;
                this.isCameraOpen = false;
                this.stopCameraStream();
                this.image = []; // Clear image after upload
                this.$router.push('/seasonColorTone');
            })
            .catch(error => {
                // Use the error message from the backend if available
                const errorMessage = error.response?.data?.message || "Cannot connect the database";
                console.error(errorMessage, error);
                swal({
                    title: "Upload failed",
                    text: errorMessage,
                    icon: "error",
                    buttons: false,
                    timer: 1200,
                    className: "error-alert"
                });
            });
        }
    }
}
</script>

<style scoped>
.icon__upload {
    font-size: 70px;
    color: #8ABAD3;
}

.upload__container {
    width: 75%;
    height: 90vh;
    padding: 10%;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.upload__container .select_button {
    font-size: 30px;
    margin: 15px 0;
    padding: 6px 10px;
    border: black solid 1px;
    border-radius: 20px;
    background-color: #EDC2D8;
    display: block;
    width: 100%;
}

.upload__container .select_button:hover {
    background-color: #FCF6F5;
}

.upload__container .messageDrag {
    font-size: 28px;
    margin: 5px 0;
}

.upload__container .upload__button {
    outline: 0;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-weight: 400;
    padding: 10px 13px;
    width: 100%;
    background: #EDC2D8;
    margin-top: 20px;
    font-size: 28px;
}

.upload__container .upload__button:hover {
    background: #E19BBF;
}

.upload__container .upload__area {
    text-align: center;
    height: 500px;
    border-radius: 5px;
    border: #EDC2D8 dashed 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: center;
    -webkit-user-select: none;
    margin-top: 10px;
}

.upload__container .showDrag {
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;
    text-align: center;
    height: 500px;
    border-radius: 5px;
    border: #EDC2D8 dashed 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: center;
    -webkit-user-select: none;
    margin-top: 10px;
    background: #FCF6F5;
    font-size: 24px;
}

.upload__container .showDrag:hover {
    opacity: 0.6;   
}

.upload__container .image__container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-height: 200px;
    position: relative;
    margin-bottom: 8px;
}

.upload__container .image__container .showImage {
    width: auto;
    margin-right: 5px;
    height: 45vh;
    position: relative;
    margin-bottom: 8px;
    overflow: hidden;
}

.upload__container .image__container .showImage img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    object-fit: cover;
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
.upload__container .upload__area.dropover {
    display: none;
}

.icon_delete {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
    color: #fff;
    background-color: red;
    border-radius: 50%;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
}

.icon_delete:hover {
    background-color: #111;
}

.upload__container .close_button {
    font-size: 28px;
    padding: 6px;
    border: solid 1px;
    border-radius: 20px;
    background-color: red;
    display: block;
    color:#fff;
    width: 25%;
    margin: 0 auto;
    display: block;
    transition: background 0.3s, border 0.3s, color 0.3s;
}

.upload__container .close_button:hover {
    background-color: #8B0000;
}

.camera-box video, .camera-box canvas {
    width: 500px;
    height: 600px;
    object-fit: cover;
}

.camera-box {
    display: flex;
    justify-content: center;
}

.camera__container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.camera-box {
    margin-top: 10px;
}

.camera-shoot {
    display: flex;
    justify-content: center; /* จัดกลาง */
    margin-top: 5px;
}

.camera-button {
    margin-top: 10px;
    font-size: 40px;
    padding: 15px;
    border-radius: 50px;
    background: #fff;
    border: 2px solid #111;
    transition: background 0.3s, border 0.3s, color 0.3s;
}

.camera-button:hover {
    background: #8ABAD3;
    border: 2px solid #8ABAD3;
    color: #fff;
}

</style>