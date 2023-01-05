// elbow, shoulder, knee, hip   
// export const anglesNum = process.env.anglesNum;
// export const anglesSet = process.env.angles;
import fs from 'fs'
// import joints from './joints.json' assert { type: 'JSON' };

var anglesJson = {
    angles: []
};


function dist(p1, p2) {
    return Math.sqrt(
        Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2) +
        Math.pow(p1[2] - p2[2], 2)
    );
}
// Function to find the angle in 3D space
function find_angle(p1, p2, p3) {
    const ab = dist(p1, p2);
    const bc = dist(p2, p3);
    const ac = dist(p1, p3);

    const angle = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc);
    return Math.acos(angle) * (180 / Math.PI)
}


function calculate_angle(name, points) {
    if (points[0] == null || points[1] == null || points[2] == null) {
        return -1;
    }
    const angle = find_angle(points[0], points[1], points[2]);
    anglesJson.angles.push({ name: name, angle: angle });

}

export function angles(body) {
    fs.readFile('./joints.json', 'utf8', (err, joints) => {
        if (err) {
            console.log("joints.json file read failes:", err)
            return
        }
        joints = JSON.parse(joints)
        const keys = Object.keys(joints);
        const result = keys.map((key) => {
            let joint = joints[key]
            let points = [find_coord(body, joint.p1), find_coord(body, joint.p2), find_coord(body, joint.p3)]
            calculate_angle(key, points)
        })
        var json = JSON.stringify(anglesJson);
        fs.writeFile('body_angles.json', json, 'utf8', (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });

    })

}

function find_coord(body, p) {
    try {
        let { x, y, z } = body.find((part) => part.part === p)
        return [x, y, z]
    }
    catch {
        return null
    }
}