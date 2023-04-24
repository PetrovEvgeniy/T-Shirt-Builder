import {proxy} from 'valtio';


const state = proxy({
    intro: true,
    color: '#0437dd',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png'
});

export default state;