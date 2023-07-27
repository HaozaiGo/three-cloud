<template>
    <div class="container" ref="sessionCity">

    </div>
</template>
<script>
import { reactive, toRefs, onBeforeMount, onMounted, ref } from 'vue'

import * as THREE from 'three';
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";

// import model from '../../static/city.mtl';

export default {
    name: 'App',
    components: {},
    setup() {
        const sessionCity = ref(null);

        const data = reactive({})


        let camera = {},
            scene = {},
            renderer = {},
            MyObj = {}
        // cube = {};

        const initScrene = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            sessionCity.value.appendChild(renderer.domElement);

            // const light = new THREE.AmbientLight(0x404040); // 柔和的白光
            const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            directionalLight.position.set( 0, 300, 100 );
            scene.add(directionalLight);



            let Loader = new OBJLoader();
            let MelLoader = new MTLLoader();
            MelLoader.load('./city.mtl', function (mtl) {
                console.log(mtl);
                mtl.preload();

                Loader.setMaterials(mtl);
                Loader.load('./city.obj', function (obj) {
                    MyObj = obj
                    console.log(MyObj);

                    MyObj.position.set(0, -20, 10)
                    scene.add(MyObj);
                })
            })



            // const loader = new THREE.ObjectLoader();
            // console.log(loader);
            // loader.load(
            //     // 资源的URL
            //     '../../public/city.obj',

            //     // onLoad回调
            //     // Here the loaded data is assumed to be an object
            //     function (obj) {
            //         // Add the loaded object to the scene
            //         console.log(obj);
            //         scene.add(obj);
            //     },

            //     // onProgress回调
            //     function (xhr) {
            //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            //     },

            //     // onError回调
            //     function (err) {
            //         console.error(err, 'An error happened');
            //     }
            // );




            // const geometry = new THREE.BoxGeometry(1, 1, 1);
            // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            // cube = new THREE.Mesh(geometry, material);
            // scene.add(cube);
            camera.position.z = 100;


        }


        const render = () => {
            requestAnimationFrame(render);

            // MyObj.rotation.x += 0.01;
            try{    
                MyObj.rotation.y += 0.005;
            }catch(err){
                console.log(err);
            }
            

            renderer.render(scene, camera);
        }

        onBeforeMount(() => {

        })
        onMounted(() => {

            initScrene();
            render();
        })
        return {
            ...toRefs(data),
            sessionCity,
        }
    },
}

</script>
<style  scoped>
.container {
    width: 100%;
    height: 100vh;
    background-color: #000;
}
</style>
