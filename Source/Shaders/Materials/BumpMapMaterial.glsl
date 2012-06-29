uniform sampler2D u_texture;
uniform vec2 u_repeat;

agi_material agi_getMaterial(agi_materialInput materialInput)
{
    agi_material material = agi_getDefaultMaterial(materialInput);

    vec2 st = materialInput.st;
    
    vec2 centerPixel = fract(u_repeat * st);
    float centerBump = texture2D(u_texture, centerPixel).bump_map_material_channels;
    
    float windowWidth = float(agi_viewport.z);
    vec2 rightPixel = fract(u_repeat * (st + vec2(1.0 / windowWidth, 0.0)));
    float rightBump = texture2D(u_texture, rightPixel).bump_map_material_channels;
    
    float windowHeight = float(agi_viewport.w);
    vec2 leftPixel = fract(u_repeat * (st + vec2(0.0, 1.0 / windowHeight)));
    float topBump = texture2D(u_texture, leftPixel).bump_map_material_channels;
    
    vec3 normalTangentSpace = normalize(vec3(centerBump - rightBump, centerBump - topBump, 0.2));
    vec3 normalEC = materialInput.tangentToEyeMatrix * normalTangentSpace;
    
    material.normal = normalEC;
    
    return material;
}