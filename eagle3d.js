/* =========================================================
   A 3D golden eagle that soars across the portfolio, seen
   from above, moving to a new anchor for each section.
   Procedurally built (no downloaded model → license-clean),
   rendered with Three.js. Falls back to the SVG eagle if
   WebGL or the library is unavailable.
   ========================================================= */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function mount() {
    if (!window.THREE) return; // keep the SVG fallback
    let renderer;
    const canvas = document.createElement('canvas');
    canvas.id = 'eagle3d';
    Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' });
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (e) { return; }
    // live inside the world layer (below the content) so the eagle soars
    // behind the text and project cards, above the scenery
    (document.getElementById('world') || document.body).appendChild(canvas);
    const svg = document.getElementById('eagle'); if (svg) svg.style.display = 'none';

    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
    cam.position.set(0, 9.2, 0.0001);
    cam.up.set(0, 0, -1);        // world -Z is "up" on screen
    cam.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const key = new THREE.DirectionalLight(0xfff1d6, 1.15); key.position.set(4, 7, 3); scene.add(key);
    const rim = new THREE.DirectionalLight(0x88a6ff, 0.45); rim.position.set(-5, 3, -4); scene.add(rim);

    const COL = { body: 0x4a3420, belly: 0x6b4f32, head: 0xcaa968, crown: 0x8a6a3a, beak: 0xf0bb3c, tail: 0x2a1d10, wing: 0x3a2817, wingEdge: 0x7a5c38 };
    const mat = (c, rough = 0.85) => new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: 0.04, flatShading: true });

    const eagle = new THREE.Group();

    // body
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.6, 18, 14), mat(COL.body));
    body.scale.set(2.05, 0.68, 0.82); eagle.add(body);
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.58, 16, 12), mat(COL.belly));
    belly.scale.set(1.8, 0.5, 0.74); belly.position.set(0.1, -0.12, 0); eagle.add(belly);

    // head + crown + beak
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12), mat(COL.head));
    head.position.set(1.28, 0.16, 0); eagle.add(head);
    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.41, 16, 12), mat(COL.crown));
    crown.position.set(1.2, 0.3, 0); crown.scale.set(1, 0.62, 1); eagle.add(crown);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.52, 10), mat(COL.beak, 0.4));
    beak.position.set(1.72, 0.1, 0); beak.rotation.z = -Math.PI / 2; eagle.add(beak);
    [-1, 1].forEach(s => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), mat(0x101010, 0.3));
      eye.position.set(1.48, 0.24, 0.18 * s); eagle.add(eye);
    });

    // tail (flat fan behind the body)
    const ts = new THREE.Shape();
    ts.moveTo(0, 0); ts.lineTo(-1.25, 0.6); ts.lineTo(-1.42, 0.22); ts.lineTo(-1.48, 0);
    ts.lineTo(-1.42, -0.22); ts.lineTo(-1.25, -0.6); ts.lineTo(0, 0);
    const tail = new THREE.Mesh(new THREE.ExtrudeGeometry(ts, { depth: 0.05, bevelEnabled: false }), mat(COL.tail));
    tail.rotation.x = -Math.PI / 2; tail.position.set(-0.95, 0.02, 0); eagle.add(tail);

    // a broad, fingered eagle wing: x = chord (leading +), y = span (outboard)
    function wingMesh() {
      const s = new THREE.Shape();
      s.moveTo(0.55, 0);
      s.lineTo(0.66, 1.3);
      s.lineTo(0.5, 2.5);
      s.lineTo(0.12, 3.35);     // leading tip
      s.lineTo(-0.16, 3.32);
      s.lineTo(-0.1, 2.95);     // primary "fingers"
      s.lineTo(-0.42, 2.9);
      s.lineTo(-0.34, 2.5);
      s.lineTo(-0.66, 2.45);
      s.lineTo(-0.55, 1.4);
      s.lineTo(-0.95, 0.9);
      s.lineTo(-0.98, 0);       // shoulder trailing
      s.closePath();
      const geo = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: false });
      const g = new THREE.Group();
      const m = new THREE.Mesh(geo, mat(COL.wing));
      g.add(m);
      // lighter trailing edge strip for depth
      const edge = new THREE.Mesh(geo, mat(COL.wingEdge));
      edge.scale.set(1, 1, 0.5); edge.position.z = -0.03; g.add(edge);
      return { group: g, mesh: m };
    }
    // right wing: span -> +Z (mesh.rotation.x = +90°); left: -Z
    const rW = wingMesh(); rW.mesh.rotation.x = Math.PI / 2; rW.group.rotation.x = Math.PI / 2;
    const rootR = new THREE.Group(); rootR.position.set(0.08, 0.14, 0.28); rootR.add(rW.group); eagle.add(rootR);
    const lW = wingMesh(); lW.mesh.rotation.x = -Math.PI / 2; lW.group.rotation.x = -Math.PI / 2;
    const rootL = new THREE.Group(); rootL.position.set(0.08, 0.14, -0.28); rootL.add(lW.group); eagle.add(rootL);

    eagle.scale.setScalar(0.4);
    scene.add(eagle);

    // where the eagle rides for each of the 7 sections (world x = across, z = up/down on screen)
    const TARG = [
      { x: 2.4, z: -1.7 },   // 0 sky      — upper right, away from the name
      { x: -2.9, z: -1.4 },  // 1 clouds   — swings left
      { x: 3.1, z: -1.9 },   // 2 canopy   — right, high
      { x: -2.6, z: -1.8 },  // 3 treetops — left, high
      { x: 3.0, z: -1.6 },   // 4 forest   — right
      { x: -2.4, z: -1.9 },  // 5 edu      — left, high
      { x: 2.9, z: -2.2 },   // 6 landing  — up in the trees, clear of the headline
    ];

    const resize = () => { renderer.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); };
    addEventListener('resize', resize); resize();

    const cur = { x: TARG[0].x, z: TARG[0].z }, prev = { x: cur.x, z: cur.z };
    let bank = 0, pitch = 0, yaw = 0, t0 = performance.now();

    function frame(now) {
      requestAnimationFrame(frame);
      const t = (now - t0) / 1000;
      const d = Math.max(0, Math.min(TARG.length - 1, window.__d || 0));
      const i = Math.floor(d), f = d - i;
      const a = TARG[i], b = TARG[Math.min(i + 1, TARG.length - 1)];
      const tx = a.x + (b.x - a.x) * f, tz = a.z + (b.z - a.z) * f;

      prev.x = cur.x; prev.z = cur.z;
      cur.x += (tx - cur.x) * 0.045;
      cur.z += (tz - cur.z) * 0.045;
      const vx = cur.x - prev.x, vz = cur.z - prev.z;
      const bob = reduced ? 0 : Math.sin(t * 1.1) * 0.12;
      eagle.position.set(cur.x, bob, cur.z);

      // the eagle noses into its travel direction, and banks into turns
      const targetYaw = Math.atan2(-vz, Math.abs(vx) < 1e-4 ? 1 : vx) * 0.6;
      yaw += (targetYaw - yaw) * 0.06;
      const targetBank = Math.max(-0.7, Math.min(0.7, -vx * 0.9));
      bank += (targetBank - bank) * 0.05;
      const targetPitch = Math.max(-0.3, Math.min(0.3, vz * 1.2));
      pitch += (targetPitch - pitch) * 0.05;
      eagle.rotation.set(pitch, yaw, bank, 'YXZ');

      // wing beat: strong while repositioning, relaxed glide while settled
      const speed = Math.hypot(vx, vz);
      const beat = reduced ? 0 : Math.sin(t * (4.5 + speed * 55));
      const amp = 0.22 + Math.min(0.45, speed * 6);
      const base = 0.12 + Math.sin(t * 0.7) * 0.03;
      rootR.rotation.x = Math.PI / 2 * 0 + base + amp * beat;  // flap about fore-aft axis
      rootL.rotation.x = -(base + amp * beat);

      renderer.render(scene, cam);
    }
    requestAnimationFrame(frame);
    window.__eagle3dReady = true;
  }

  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload = mount;
  s.onerror = () => {}; // SVG eagle stays as the fallback
  document.head.appendChild(s);
})();
