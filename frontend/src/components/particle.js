import Particles from "react-tsparticles";
import React, { useCallback } from "react";
import { loadStarsPreset } from "tsparticles-preset-stars";

const Particle = () => {
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadStarsPreset(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  const options = {
    preset: "stars",
    background: {
        color:{
            value: "",
        }
    },
    size: {
      value: { min: 1.05, max: 1.15 }
    },
    zIndex:0,
    
  };
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
};

export default Particle;