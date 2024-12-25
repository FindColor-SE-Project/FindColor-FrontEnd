<template>
    <div class="product-container">
        <!-- Left -->
        <div class="season-left">
            <!-- Button -->
            <button class="change-button josefin-sans-font" @click="removeImage(image)">
                <font-awesome-icon :icon="['fas', 'trash']" /> Remove Image
            </button>

            <!-- Image -->
            <div v-if="croppedImage" class="image-container" :class="changeBackgroundColor(currentSeasonColorTone)">
                <img :src="`data:image/jpeg;base64,${croppedImage}`" alt="Cropped Image" />
            </div>
        </div>

        <!-- Right -->
        <div class="season-right">
            <div class="card button-group">
                <button class="cardo-regular" v-for="seasonColorToneOption in seasonColorToneOptions" :key="seasonColorToneOption.seasonColorTone"
                    :class="{ 'active': seasonColorToneOption.seasonColorTone === currentSeasonColorTone }" @click="currentSeasonColorToneOption(seasonColorToneOption.seasonColorTone)">
                    {{ seasonColorToneOption.name }}
                </button>
            </div>
            <div v-if="selectedSeasonColorToneOption" class="detail cardo-regular" :class="['detail', currentSeasonColorTone?.toLowerCase()]">
                <span :class="['season', currentSeasonColorTone?.toLowerCase()]"></span>
                <h2 class="cardo-regular">{{ selectedSeasonColorToneOption.name }}</h2>
                <p class="cardo-regular">{{ selectedSeasonColorToneOption.description }}</p>
            </div>
            <div v-else class="detail">
                <h2 class="cardo-regular">Select a season color tone</h2>
                <p class="cardo-regular">No season selected</p>
            </div>
            <router-link v-if="selectedSeasonColorToneOption" :to="{ name: 'seasonView', params: { seasonColorTone: selectedSeasonColorToneOption.seasonColorTone } }">
                <button class="next-button josefin-sans-font" @click="saveSelectedSeasonColorToneOption">Next</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
        data() {
        return {
            currentSeasonColorTone: null,
            croppedImage: null, // ตัวแปรเพื่อเก็บภาพที่ถูกครอบ
            seasonColorToneOptions: [
                { name: 'Spring', seasonColorTone: 'Spring', description: 'The makeup tone is Coral, Orange, Milk Tea, Peach-Pink, Salmon-Pink, Salmon, Coral-Pink, and Peach' },
                { name: 'Summer', seasonColorTone: 'Summer', description: 'The makeup tone is Pink Nude, Rosy, Pink, Lilac, Medium Pink, Light Rose, Light Pink, and Lavender' },
                { name: 'Autumn', seasonColorTone: 'Autumn', description: 'The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Brick Orange, Tomato, and Brown Brick' },
                { name: 'Winter', seasonColorTone: 'Winter', description: 'The makeup tone is Dark Pink, Burgundy, Berry, True Red, Deep Plum, Fuchsia, Magenta, and Hot Pink' },
            ],
            image: null,
        };
    },

    computed: {
        selectedSeasonColorToneOption() {
            return this.seasonColorToneOptions.find(option => option.seasonColorTone === this.currentSeasonColorTone) || null;
        }
    },

    methods: {
        async currentSeasonColorToneOption(seasonColorTone) {
            this.currentSeasonColorTone = seasonColorTone;
            console.log("Season Color Tone: " + seasonColorTone);
        },

        dataURLtoBlob(dataURL) {
            const byteString = atob(dataURL.split(',')[1]);
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        },

        async saveSelectedSeasonColorToneOption() {
            try {
                const response = await axios.post('http://localhost:8000/user/seasonColorTone', {
                    seasonColorTone: this.currentSeasonColorTone
                });
                console.log(response.data.message);
            } catch (error) {
                console.error("Full error response:", error.response);
                alert("เกิดข้อผิดพลาดในการบันทึกฤดู: " + (error.response?.data?.message || error.message));
            }
        },

        async fetchImage() {
            try {
                const response = await axios.get('http://localhost:8000/user');
                console.log(response.data); // Log ข้อมูลที่ได้มาเพื่อตรวจสอบ

                // เก็บภาพเดียวลงในตัวแปร
                if (response.data.length > 0) {
                    this.image = response.data[0]; // ใช้ภาพแรก
                    this.cropImage(); // ครอปภาพเมื่อโหลดเสร็จ
                }
            } catch (error) {
                console.error(error, "Error, You didn't connect with the database.");
                this.$router.push({ name: 'DatabaseError' });
            }
        },

        async cropImage() {
            if (this.image) {
                const formData = new FormData();
                const blob = this.dataURLtoBlob(`data:image/jpeg;base64,${this.image.image_data}`);
                formData.append('file', blob, this.image.filename);

                try {
                    const response = await axios.post('http://localhost:8000/user/crop_image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.croppedImage = response.data.image; // อัปเดตตัวแปร croppedImage
                } catch (error) {
                    console.error("Error cropping image:", error.response);
                    alert("เกิดข้อผิดพลาดในการครอปภาพ");
                }
            }
        },

        changeBackgroundColor(season) {
            switch (season) {
                case 'Spring':
                    return 'background-spring'; // เปลี่ยนสีพื้นหลัง
                case 'Summer':
                    return 'background-summer';
                case 'Autumn':
                    return 'background-autumn';
                case 'Winter':
                    return 'background-winter';
                default:
                    return 'background-default';
            }
        },

        async removeImage() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you cannot recover this image!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                try {
                    // เรียกใช้ API เพื่อลบข้อมูลทั้งหมด
                    const response = await axios.delete(`http://localhost:8000/user`);

                    // แสดง Noti ว่าลบสำเร็จ
                    swal("Deleted!", response.data.message, "success");

                    // หลังจากลบข้อมูลเสร็จสิ้น กลับไปที่หน้า Upload
                    this.$router.push('/upload');
                } catch (error) {
                    // หากเกิดข้อผิดพลาด แสดงข้อความเตือน
                    console.error(error);
                    swal("Error", "Failed to delete the image. Please try again.", "error");
                }
                } else {
                // แสดงข้อความเมื่อผู้ใช้ยกเลิกการลบ
                swal("Cancelled", "Your image is safe!", "info");
                }
            });
        }
    },

    mounted() {
        this.fetchImage();
    }
}
</script>

<style scoped>
.product-container {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.season-left,
.season-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
}

.detail {
    text-align: center;
    width: 45%;
    border-radius: 4px;
    margin-top: 20px;
    padding: 10px;
}

.detail h2 {
    margin: 10px;
    font-size: 32px;
    color: #333;
}

.detail p {
    margin: 0;
    font-size: 24px;
    color: #666;
}

.card {
    background-color: #F9E9F1;
    border-radius: 5px;
    padding: 10px;
    width: 580px;
    text-align: justify;
    margin: 5px;
}

.button-group button {
    background-color: #fff;
    font-size: 32px;
    padding: 0 10px;
    margin: 5px;
    border: 3px solid #EDC2D8;
    border-radius: 5px;
}

.button-group button:hover {
    font-weight: bold;
    background-color: #EDC2D8;
}

.button-group button.active  {
    background-color: #EDC2D8;
    font-weight: bold;
}

.season-select {
    font-size: 16px;
}

.large-button {
    width: 100%;
    font-size: 18px;
    padding: 10px;
}

.next-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 20px;
    background-color: #8ABAD3;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.next-button:hover {
    background-color: #5299be;
}

/* .image-container img {
  width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: 50%; ทำให้รูปภาพเป็นวงรี
} */

.background-default {
    background-color: #666;
}

.background-spring {
    background-color: #fff;
    background-image: repeating-conic-gradient(
    #FFB07C 0deg 22.5deg,
    #FF7F50 22.5deg 45deg,
    #FFA500 45deg 67.5deg,
    #FF7E70 67.5deg 90deg,
    #D08574 90deg 112.5deg,
    #FE7B7C 112.5deg 135deg,
    #F88379 135deg 157.5deg,
    #FF9A8A 157.5deg 180deg);
}

.background-summer {
    background-color: #fff;
    background-image: repeating-conic-gradient(
    #FFC0CB 0deg 22.5deg,
    #D3D3FF 22.5deg 45deg,
    #C8A2C8 45deg 67.5deg,
    #FFC5CB 67.5deg 90deg,
    #F2DADF 90deg 112.5deg,
    #FFB6C1 112.5deg 135deg,
    #F6688E 135deg 157.5deg,
    #F36196 157.5deg 180deg);
}

.background-autumn {
    background-color: #fff;
    background-image: repeating-conic-gradient(
    #DE7E5D 0deg 22.5deg,
    #FF6347 22.5deg 45deg,
    #C14A09 45deg 67.5deg,
    #855246 67.5deg 90deg,
    #964B00 90deg 112.5deg,
    #FF0000 112.5deg 135deg,
    #FF5733 135deg 157.5deg,
    #FF4500 157.5deg 180deg);
}

.background-winter {
    background-color: #fff;
    background-image: repeating-conic-gradient(
    #FF00FF 0deg 22.5deg,
    #5A2653 22.5deg 45deg,
    #990F4B 45deg 67.5deg,
    #AA336A 67.5deg 90deg,
    #800020 90deg 112.5deg,
    #BF1932 112.5deg 135deg,
    #EF2B7C 135deg 157.5deg,
    #FF69B4 157.5deg 180deg);
}

.image-container {
    padding: 50px; /* เพิ่ม padding หากต้องการ */
    transition: background-color 0.3s; /* เพิ่ม transition เพื่อให้สวยงาม */
}

.button-row {
  display: flex; /* จัดปุ่มให้เป็นแถวเดียวกัน */
  align-self: flex-end;
  margin-bottom: 20px;
}

.change-button {
  font-size: 20px;
  margin: 0 10px;
  border: 1px solid #000;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #fff;
}

.change-button:hover {
  color: #fff;
  background-color: #2E2E2E;
  border: 1px solid #2E2E2E;
}

.season {
    border: none;
}

.season.spring::after {
  content: url("https://img.icons8.com/color/96/spring.png"); /* Spring */
}

.season.summer::after {
  content: url("https://img.icons8.com/color/96/summer--v1.png"); /* Summer */
}

.season.autumn::after {
  content: url("https://img.icons8.com/color/96/autumn.png"); /* Autumn */
}

.season.winter::after {
  content: url("https://img.icons8.com/color/96/winter--v1.png"); /* Winter */
}

</style>
