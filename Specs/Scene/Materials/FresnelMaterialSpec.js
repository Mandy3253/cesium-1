/*global defineSuite*/
defineSuite([
        'Scene/Materials/FresnelMaterial',
        '../Specs/renderMaterial',
        '../Specs/createContext',
        '../Specs/destroyContext',
        'Renderer/PixelFormat'
    ], function(
        FresnelMapMaterial,
        renderMaterial,
        createContext,
        destroyContext,
        PixelFormat) {
    "use strict";
    /*global it,waitsFor,expect*/

    var greenImage;

    it("initialize suite", function() {
        greenImage = new Image();
        greenImage.src = "./Data/Images/Green.png";

        waitsFor(function() {
            return greenImage.complete;
        }, "Load .png file(s) for texture test.", 3000);
    });

    it("draws a fresnel material", function() {
        var context = createContext();
        var pixel = renderMaterial(new FresnelMapMaterial({
            cubeMap : context.createCubeMap({
                source : {
                    positiveX : greenImage,
                    negativeX : greenImage,
                    positiveY : greenImage,
                    negativeY : greenImage,
                    positiveZ : greenImage,
                    negativeZ : greenImage
                },
                pixelFormat : PixelFormat.RGB
            }),
            indexOfRefractionRatio : (1.0 / 1.1)
        }), context);
        expect(pixel).not.toEqualArray([0, 0, 0, 0]);
        destroyContext(context);
    });
});
