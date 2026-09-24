const $ = (id) => document.getElementById(id);

// Each category holds one or more real benchmark tasks; each task holds one or
// more reference images (a before/after pair when the dataset has one, a single
// reference image otherwise). The left/right arrows page through every image in
// the active category, task detail text updates whenever the task changes.
const categories = {
  part: {
    tab: 'Part design', count: 77, category: 'PART / PART DESIGN', folder: 'part',
    tasks: [
      {
        id: 'freecad-part-074',
        title: 'Continue an existing design.',
        summary: 'Open the supplied part and build the target using four pad and pocket operations. Use the specified sketches and dimensions.',
        deliverable: 'A saved FreeCAD project with the requested features and dimensions.',
        checks: 'Feature types, sketch links, lengths, and task-specific geometric properties.',
        images: [{src:'assets/img/tasks/part/part_task_074_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/part/part_task_074_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-part-064',
        title: 'Pattern subtractive cuts around two datum lines.',
        summary: 'Open the preconditioned part and cut two polar-patterned sets of subtractive cylinders: a 3 mm cut repeated 6 times around one datum line, and a 4 mm cut repeated 8 times around another.',
        deliverable: 'A saved FreeCAD project with both patterned cylinder cuts applied.',
        checks: 'Subtractive Cylinder and Polar Pattern feature types, counts, and dimensions.',
        images: [{src:'assets/img/tasks/part/part_task_064_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/part/part_task_064_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-part-065',
        title: 'Mirror two pads from supplied sketches.',
        summary: 'Open the preconditioned part and add two raised pads — 5 mm and 10 mm tall — then mirror each pad across its own sketch to complete the target shape.',
        deliverable: 'A saved FreeCAD project with both pads and their mirrored copies.',
        checks: 'Pad and Mirror feature types, heights, and mirror planes.',
        images: [{src:'assets/img/tasks/part/part_task_065_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/part/part_task_065_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-part-069',
        title: 'Mirror an existing pad across a sketch plane.',
        summary: 'Open the preconditioned part and mirror the existing Pad feature across the supplied sketch plane so matching geometry appears on the opposite side.',
        deliverable: 'A saved FreeCAD project with the mirrored pad feature.',
        checks: 'Mirror feature type and resulting geometry symmetry.',
        images: [{src:'assets/img/tasks/part/part_task_069_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/part/part_task_069_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-part-070',
        title: 'Multi-Transform, pattern, and fillet a pad.',
        summary: 'Apply a Multi-Transform to the existing pad — mirroring it and applying a 3-instance polar pattern — then add a 5 mm fillet to the transformed edges.',
        deliverable: 'A saved FreeCAD project with the Multi-Transform and fillet applied.',
        checks: 'Multi-Transform sub-features, Polar Pattern count, and fillet radius.',
        images: [{src:'assets/img/tasks/part/part_task_070_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/part/part_task_070_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-part-072',
        title: 'Add revolved grooves and a pocket.',
        summary: 'Open the preconditioned part and add two 360° revolved grooves plus a 50 mm deep pocket from the supplied sketches.',
        deliverable: 'A saved FreeCAD project with both grooves and the pocket.',
        checks: 'Groove and Pocket feature types, angles, and depth.',
        images: [{src:'assets/img/tasks/part/part_task_072_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/part/part_task_072_after.png', label:'REFERENCE TARGET'}]
      }
    ]
  },
  sketch: {
    tab: 'Sketch', count: 63, category: 'SKETCH', folder: 'sketch',
    tasks: [
      {
        id: 'freecad-sketch-043',
        title: 'Recreate a tangent arc-and-circle profile.',
        summary: 'Recreate the reference sketch as a fully constrained profile in the XY plane, using tangent arcs and circles tied together with coincidence and horizontal/vertical constraints.',
        deliverable: 'A fully constrained FreeCAD sketch matching the reference image.',
        checks: 'Line, arc, and circle entities with dimension, tangent, coincidence, and horizontal/vertical constraints.',
        images: [{src:'assets/img/tasks/sketch/freecad-sketch-043.png', label:'REFERENCE SKETCH'}]
      },
      {
        id: 'freecad-sketch-044',
        title: 'Recreate a tangent arc-and-circle sketch.',
        summary: 'Recreate the reference sketch as a fully constrained profile in the XY plane, combining lines, arcs, and circles with tangent and coincidence constraints.',
        deliverable: 'A fully constrained FreeCAD sketch matching the reference image.',
        checks: 'Line, arc, and circle entities with dimension, tangent, and coincidence constraints.',
        images: [{src:'assets/img/tasks/sketch/freecad-sketch-044.png', label:'REFERENCE SKETCH'}]
      },
      {
        id: 'freecad-sketch-046',
        title: 'Recreate a sketch inside a preconditioned part.',
        summary: 'Open the preconditioned file and recreate the reference sketch as a fully constrained profile, including its construction geometry.',
        deliverable: 'A fully constrained FreeCAD sketch saved inside the preconditioned document.',
        checks: 'Line, arc, and circle entities, construction geometry, and dimension/tangent/coincidence constraints.',
        images: [{src:'assets/img/tasks/sketch/freecad-sketch-046.png', label:'REFERENCE SKETCH'}]
      },
      {
        id: 'freecad-sketch-052',
        title: 'Recreate a polyline profile with construction geometry.',
        summary: 'Recreate the reference sketch as a fully constrained profile combining polylines, arcs, and circles with construction geometry.',
        deliverable: 'A fully constrained FreeCAD sketch matching the reference image.',
        checks: 'Line, polyline, arc, and circle entities, construction geometry, and horizontal/vertical/tangent/coincidence constraints.',
        images: [{src:'assets/img/tasks/sketch/freecad-sketch-052.png', label:'REFERENCE SKETCH'}]
      },
      {
        id: 'freecad-sketch-054',
        title: 'Recreate a constrained polyline profile.',
        summary: 'Recreate the reference sketch as a fully constrained polyline profile, tied down with horizontal/vertical and coincidence constraints.',
        deliverable: 'A fully constrained FreeCAD sketch matching the reference image.',
        checks: 'Line and polyline entities with dimension, horizontal/vertical, and coincidence constraints.',
        images: [{src:'assets/img/tasks/sketch/freecad-sketch-054.png', label:'REFERENCE SKETCH'}]
      },
      {
        id: 'freecad-sketch-056',
        title: 'Recreate a tangent line-and-arc profile.',
        summary: 'Recreate the reference sketch as a fully constrained profile, joining lines and arcs with tangent and coincidence constraints.',
        deliverable: 'A fully constrained FreeCAD sketch matching the reference image.',
        checks: 'Line and arc entities with dimension, horizontal/vertical, tangent, and coincidence constraints.',
        images: [{src:'assets/img/tasks/sketch/freecad-sketch-056.png', label:'REFERENCE SKETCH'}]
      },
      {
        id: 'freecad-sketch-059',
        title: 'Recreate a constrained line-and-polyline profile.',
        summary: 'Recreate the reference sketch as a fully constrained profile, combining lines and polylines with horizontal/vertical and coincidence constraints.',
        deliverable: 'A fully constrained FreeCAD sketch matching the reference image.',
        checks: 'Line and polyline entities with dimension, horizontal/vertical, and coincidence constraints.',
        images: [{src:'assets/img/tasks/sketch/freecad-sketch-059.png', label:'REFERENCE SKETCH'}]
      }
    ]
  },
  assemble: {
    tab: 'Assembly', count: 25, category: 'ASSEMBLY', folder: 'assemble',
    tasks: [
      {
        id: 'freecad-assemble-003',
        title: 'Ground a cube and set a 5 mm distance joint.',
        summary: 'Open the starting assembly, ground the larger cube, and apply a Distance Joint so the two closest faces sit exactly 5 mm apart.',
        deliverable: 'A saved assembly with the grounded part and distance joint.',
        checks: 'Grounded reference part and the Distance Joint value.',
        images: [{src:'assets/img/tasks/assemble/assembly_task_003_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/assemble/assembly_task_003_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-assemble-005',
        title: 'Fix attachments and add cylindrical screw joints.',
        summary: 'Ground the pink part, apply Fixed Joints to the attached parts, then add Cylindrical Joints for the screws, cloning screws as needed.',
        deliverable: 'A saved assembly with the fixed and cylindrical joints in place.',
        checks: 'Joint types, joint counts, and the grounded reference part.',
        images: [{src:'assets/img/tasks/assemble/assembly_task_005_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/assemble/assembly_task_005_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-assemble-015',
        title: 'Ground the housing and thread a screw joint.',
        summary: 'Ground the HBS part and apply a Screw Joint to the Tuerca so it threads correctly.',
        deliverable: 'A saved assembly with the grounded part and screw joint.',
        checks: 'Grounded state and Screw Joint configuration.',
        images: [{src:'assets/img/tasks/assemble/assembly_task_015_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/assemble/assembly_task_015_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-assemble-016',
        title: 'Fix retainer pins in the correct direction.',
        summary: 'Ground the plastic retainer and apply Fixed Joints to attach the pins, taking care to match their orientation.',
        deliverable: 'A saved assembly with the retainer and pins fixed in place.',
        checks: 'Grounded state, Fixed Joint count, and pin orientation.',
        images: [{src:'assets/img/tasks/assemble/assembly_task_016_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/assemble/assembly_task_016_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-assemble-020',
        title: 'Combine a distance and gear joint at a 3:1 ratio.',
        summary: 'Ground the larger gear bolt, apply a Distance Joint to the smaller gear bolt, then connect the two gears with a Gear Joint at a 3:1 radius ratio.',
        deliverable: 'A saved assembly with the distance and gear joints configured.',
        checks: 'Distance Joint value, Gear Joint ratio, and the grounded part.',
        images: [{src:'assets/img/tasks/assemble/assembly_task_020_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/assemble/assembly_task_020_after.png', label:'REFERENCE TARGET'}]
      },
      {
        id: 'freecad-assemble-022',
        title: 'Ground the base and add a slider joint.',
        summary: 'Ground the yellow base and apply a Slider Joint so the assembly follows its intended sliding motion.',
        deliverable: 'A saved assembly with the grounded base and slider joint.',
        checks: 'Grounded state and Slider Joint configuration.',
        images: [{src:'assets/img/tasks/assemble/assembly_task_022_before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/assemble/assembly_task_022_after.png', label:'REFERENCE TARGET'}]
      }
    ]
  },
  cam: {
    tab: 'Manufacturing', count: 15, category: 'MANUFACTURING / CAM', folder: 'cam',
    tasks: [
      {
        id: 'freecad-cam-007',
        title: 'Machine a torus-cut box from oversized stock.',
        summary: 'Finish the CAM setup for a cube box with a torus cut on top. Use the oversized stock exactly as supplied, and machine the full target shape including the bottom side.',
        deliverable: 'A FreeCAD document with generated CAM toolpaths covering both sides.',
        checks: 'Generated toolpaths and stock-to-target material removal using the fixed, unmodified stock.',
        images: [{src:'assets/img/tasks/cam/freecad-cam-007.png', label:'TASK REFERENCE'}]
      },
      {
        id: 'freecad-cam-011',
        title: 'Define your own stock and cut the target.',
        summary: 'Create a CAM job for the target shape. Since no stock is supplied, define a stock block that fully contains the target before generating toolpaths.',
        deliverable: 'A FreeCAD document with an agent-defined stock and generated CAM toolpaths.',
        checks: 'Stock definition, generated toolpaths, and stock-to-target material removal.',
        images: [{src:'assets/img/tasks/cam/freecad-cam-011.png', label:'TASK REFERENCE'}]
      },
      {
        id: 'freecad-cam-015',
        title: 'Machine the target from a fixed CAM stock.',
        summary: 'Finish the CAM setup and cut the target part using the given stock block, without changing its dimensions, position, or material.',
        deliverable: 'A FreeCAD document with generated CAM toolpaths using the fixed stock.',
        checks: 'Generated toolpaths and stock-to-target material removal using the unmodified stock.',
        images: [{src:'assets/img/tasks/cam/freecad-cam-015.png', label:'TASK REFERENCE'}]
      }
    ]
  },
  measure: {
    tab: 'Measurement', count: 3, category: 'CAD UTILITIES / MEASURE', folder: 'measure',
    tasks: [
      {
        id: 'freecad-measure-001',
        title: 'Measure surface area, mass center, and distance.',
        summary: 'Open the supplied part and add measurements for the top surface area, center of mass, and the distance between the two furthest points shown in the reference image.',
        deliverable: 'A saved FreeCAD document with all three measurements attached.',
        checks: 'Presence and values of the surface-area, center-of-mass, and distance measurements.',
        images: [{src:'assets/img/tasks/measure/freecad-measure-001.png', label:'REFERENCE TARGET'}]
      }
    ]
  },
  mesh: {
    tab: 'Mesh', count: 3, category: 'CAD UTILITIES / MESH', folder: 'mesh',
    tasks: [
      {
        id: 'freecad-mesh-001',
        title: 'Mesh a body to a target deviation tolerance.',
        summary: 'Open the supplied body and create a mesh with 0.1 mm surface deviation and a 10° angular deviation.',
        deliverable: 'A saved FreeCAD document containing the generated mesh.',
        checks: 'Mesh object presence and its surface/angular deviation settings.',
        images: [{src:'assets/img/tasks/mesh/freecad-mesh-001-before.png', label:'STARTING STATE'}, {src:'assets/img/tasks/mesh/freecad-mesh-001-after.png', label:'REFERENCE TARGET'}]
      }
    ]
  },
  fem: {
    tab: 'Simulation', count: 3, category: 'SIMULATION / FEM', folder: 'fem',
    tasks: [
      {
        id: 'freecad-fem-002',
        title: 'Carry the design into analysis.',
        summary: 'Apply a 20 kN tension load to an elliptical chain loop using Iron-Generic material. Mesh the part and run the CalculiX solver.',
        deliverable: 'The FreeCAD analysis project and an exported result CSV.',
        checks: 'Required analysis objects and task-specific numerical CSV checks. Output retention is being reviewed.',
        images: [{src:'assets/img/tasks/fem/freecad-fem-002-after.png', label:'REFERENCE VISUALIZATION'}]
      }
    ]
  }
};

let activeCategory = 'sketch';
let activeSlide = 0;

function currentSlides() {
  const cat = categories[activeCategory];
  const slides = [];
  cat.tasks.forEach(task => {
    task.images.forEach(img => slides.push({task, image: img.src, label: img.label}));
  });
  return slides;
}

function renderTask() {
  const slides = currentSlides();
  activeSlide = ((activeSlide % slides.length) + slides.length) % slides.length;
  const slide = slides[activeSlide];
  const task = slide.task;
  const cat = categories[activeCategory];
  $('task-id').textContent = task.id.toUpperCase();
  $('task-category').textContent = cat.category;
  $('task-title').textContent = task.title;
  $('task-summary').textContent = task.summary;
  $('task-deliverable').textContent = task.deliverable;
  $('task-checks').textContent = task.checks;
  $('task-image').src = slide.image;
  $('task-image').alt = task.title;
  $('asset-label').textContent = slide.label;
  $('task-source').href = `https://github.com/Zdong104/CADWORLD/blob/main/evaluation_examples/examples/${cat.folder}/${task.id}.json`;
  const nav = $('task-nav');
  if (slides.length > 1) {
    nav.hidden = false;
    $('slide-counter').textContent = `${activeSlide + 1} / ${slides.length}`;
  } else {
    nav.hidden = true;
  }
  $('status').textContent = task.title + ' example selected.';
}

document.querySelectorAll('[data-task]').forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.task;
  activeSlide = 0;
  document.querySelectorAll('[data-task]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderTask();
}));
$('slide-prev').addEventListener('click', () => { activeSlide -= 1; renderTask(); });
$('slide-next').addEventListener('click', () => { activeSlide += 1; renderTask(); });
renderTask();

const models=[
  {name:'GPT5.4',cua:true,scores:[17.5,12.7,22.1,16,0,35.3]},
  {name:'Opus4.8',cua:true,scores:[16,7.9,22.1,8,0,47.1]},
  {name:'Kimi K2.6',scores:[7.5,1.6,10.4,0,0,35.3]},
  {name:'OpenCUA',scores:[1.5,0,3.9,0,0,0]},
  {name:'Holo 3.1',scores:[0.5,0,1.3,0,0,0]},
  {name:'Qwen3.6',scores:[0,0,0,0,0,0]},
  {name:'MiniMax M3',scores:[0,0,0,0,0,0]}
];
const groups=['overall','sketch','part','assembly','mfg','utilities'];
const human=[87,88.9,88.3,84,77.8,88.2],counts=[200,63,77,25,18,17];
function renderResults(){
  const index=groups.indexOf($('result-group').value);
  const sorted=[...models].sort((a,b)=>b.scores[index]-a.scores[index]);
  $('results-rows').replaceChildren();
  sorted.forEach((model,i)=>{
    const row=document.createElement('tr');if(model.scores[index]>0&&model.scores[index]===sorted[0].scores[index])row.className='best';
    row.innerHTML=`<td><span class="rank">${String(i+1).padStart(2,'0')}</span>${model.name}${model.cua?'<span class="cua-tag">CUA</span>':''}</td><td><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${model.scores[index]}%"></div></div></td><td class="numeric">${model.scores[index].toFixed(1)}%</td>`;
    $('results-rows').append(row);
  });
  $('expert-number').innerHTML=human[index].toFixed(1)+'<span>%</span>';$('selected-count').textContent=counts[index];
}
$('result-group').addEventListener('change',()=>{renderResults();$('status').textContent='Results updated for '+$('result-group').selectedOptions[0].textContent;});renderResults();
const setup={
  environment:{title:'01 / ENVIRONMENT',code:'git clone https://github.com/Zdong104/CADWORLD.git\ncd CADWORLD\nuv sync\n\n# Download the FreeCAD desktop environment\nuv run python scripts/python/download_vm_image.py',note:'First complete the Linux/KVM and Docker setup in the installation guide. Allow about 35 GB for the VM image. CAM evaluation also requires host-side FreeCAD 1.1.x.'},
  smoke:{title:'02 / INSTALLATION SMOKE TEST',code:'uv run python scripts/python/run_cadworld.py \\\n  --test_all_meta_path evaluation_examples/test_easy.json \\\n  --agent api \\\n  --api_provider openai \\\n  --model_name gpt-5.4 \\\n  --max_steps 3 \\\n  --no-skip_finished',note:'Set the provider API key in .env as described in the README. This paid-API example checks the installation with 3 steps; it is not a benchmark score or a paper reproduction.'},
  agent:{title:'03 / YOUR AGENT ADAPTER',code:'class MyAgent:\n    def reset(self, *args, **kwargs):\n        pass\n\n    def predict(self, instruction, obs):\n        screenshot = obs["screenshot"]\n        # Call your agent and return valid GUI actions.\n        return {"response": "wait"}, ["WAIT"]',note:'Interface sketch only: replace WAIT with your agent’s action output. Use --agent your_module:MyAgent and follow the model output contract. Confirm the allowed tools before comparing harnesses.'}
};
let activeSetup='environment';
function renderSetup(){const s=setup[activeSetup];$('code-title').textContent=s.title;$('setup-code').textContent=s.code;$('code-note').textContent=s.note;$('copy-command').textContent='Copy';}
document.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>{activeSetup=button.dataset.start;document.querySelectorAll('[data-start]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderSetup();}));renderSetup();
async function copyText(text,button,label){try{await navigator.clipboard.writeText(text);button.textContent='Copied';$('status').textContent='Copied to clipboard.';setTimeout(()=>{button.textContent=label;},1800);}catch{button.textContent='Select text to copy';$('status').textContent='Clipboard is unavailable. Select and copy the displayed text.';}}
$('copy-command').addEventListener('click',()=>copyText(setup[activeSetup].code,$('copy-command'),'Copy'));
$('copy-citation').addEventListener('click',()=>copyText($('bibtex').textContent,$('copy-citation'),'Copy BibTeX'));
const dialog=$('asset-dialog');
function showAsset(src,alt,title,caption){$('dialog-title').textContent=title;$('dialog-image').src=src;$('dialog-image').alt=alt;$('dialog-caption').textContent=caption;dialog.showModal();}
$('expand-image').addEventListener('click',()=>{const slides=currentSlides();const slide=slides[activeSlide];showAsset(slide.image,slide.task.title,slide.task.id,'Published task reference asset. This image is not an agent rollout.');});
$('montage-open').addEventListener('click',()=>showAsset('assets/img/workflows.gif','Published CADWorld workflow montage','CADWorld · Workflow montage','Original overview animation from the CADWorld repository.'));
$('dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{$('dialog-image').removeAttribute('src');});
