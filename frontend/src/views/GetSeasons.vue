<template>
    <div class="product-container">
        <!-- Left -->
        <div class="season-left">
            <!-- Button -->
            <button class="change-button josefin-sans-font" @click="changeImage(images.id)">
                <font-awesome-icon :icon="['fas', 'trash']" /> Change Image
            </button>

            <!-- Image -->
            <div v-for="image in images" :key="image.filename" class="image-container" :class="getBackgroundColor(selectedSeason)">
                <img :src="`data:image/jpeg;base64,${image.filepath}`" :alt="image.filename" />
            </div>
        </div>

        <!-- Right -->
        <div class="season-right">
            <div class="card button-group">
                <button class="cardo-regular" v-for="option in options" :key="option.seasonColorTone"
                    :class="{ 'active': option.seasonColorTone === selectedSeason }" @click="selectOption(option.seasonColorTone)">
                    {{ option.name }}
                </button>
            </div>
            <div v-if="selectedOption" class="detail cardo-regular">
                <h2 class="cardo-regular">{{ selectedOption.name }}</h2>
                <p class="cardo-regular">{{ selectedOption.detail }}</p>
            </div>
            <div v-else class="detail">
                <h2 class="cardo-regular">Select a season</h2>
                <p class="cardo-regular">No season selected</p>
            </div>
            <router-link v-if="selectedOption" :to="{ name: 'seasonLayout', params: { seasonColorTone: selectedOption.seasonColorTone } }">
                <button class="next-button josefin-sans-font" @click="saveSelectedOption">Next</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedSeason: null,
            options: [
                { name: 'Spring', seasonColorTone: 'Spring', detail: 'The makeup tone is Coral, Orange, Milk Tea, Peach-Pink, Salmon-Pink, Salmon, Coral-Pink, and Peach' },
                { name: 'Summer', seasonColorTone: 'Summer', detail: 'The makeup tone is Pink Nude, Rosy, Pink, Lilac, Medium Pink, Light Rose, Light Pink, and Lavender' },
                { name: 'Autumn', seasonColorTone: 'Autumn', detail: 'The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Brick Orange, Tomato, and Brown Brick' },
                { name: 'Winter', seasonColorTone: 'Winter', detail: 'The makeup tone is Dark Pink, Burgundy, Berry, True Red, Deep Plum, Fuchsia, Magenta, and Hot Pink' },
            ],
            images: [],
        };
    },

    computed: {
        selectedOption() {
            return this.options.find(option => option.seasonColorTone === this.selectedSeason) || null;
        }
    },

    methods: {
        selectOption(seasonColorTone) {
            this.selectedSeason = seasonColorTone;
        },

        async saveSelectedOption() {
            try {
                const response = await axios.post('http://localhost:8000/user/seasonColorTone', {
                    seasonColorTone: this.selectedSeason
                });
                console.log(response.data.message);
            } catch (error) {
                console.error("Full error response:", error.response);
                alert("เกิดข้อผิดพลาดในการบันทึกฤดู: " + (error.response?.data?.message || error.message));
            }
        },

        async displayImage() {
            try {
                const response = await axios.get('http://localhost:8000/user');
                console.log(response.data);  // Log ข้อมูลที่ได้มาเพื่อตรวจสอบ
                this.images = response.data.map(image => ({
                    ...image,
                    id: image.id  // เพิ่ม id ของภาพ เพื่อเชื่อมโยงกับปุ่มลบ
                }));
            } catch (error) {
                console.error(error, "Error, You didn't connect with the database.");
                this.$router.push({ name: 'DatabaseError' });
            }
        },

        getBackgroundColor(season) {
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
                    return '';
            }
        },

        async changeImage() {
            try {
                // เรียกใช้ API เพื่อลบข้อมูลทั้งหมด
                const response = await axios.delete(`http://localhost:8000/user`);
                console.log(response.data.message);
                
                // หลังจากลบข้อมูลเสร็จสิ้น กลับไปที่หน้า Upload
                this.$router.push('/upload');
            } catch (error) {
                console.error("Error deleting images:", error.response);
                alert("เกิดข้อผิดพลาดในการลบข้อมูล");
            }
        }
    },

    mounted() {
        this.displayImage();
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
    width: 50%;
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

.image-container img {
  width: 400px; /* ปรับขนาดรูปภาพตามที่ต้องการ */
  height: 500px;
  object-fit: cover; /* ครอปรูปภาพให้อยู่ภายในขอบเขต */
  border-radius: 50%; /* ทำให้รูปภาพเป็นวงรี */
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
</style>
