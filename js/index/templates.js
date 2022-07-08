function singleCourseDesign(course) {
    return `
        <div class="relative border rounded-md shadow-lg px-2 py-5 flex flex-col items-center space-y-5">
            <div class="bg-slate-100 absolute border px-3 py-1 top-2 left-0 rounded-tr-md rounded-br-md border-l-2 border-l-black">
                <p>Batch ${course.session.starts} - ${course.session.ends} • ${course.duration}</p>
            </div>
            <div class="flex flex-row items-center space-x-2 bg-slate-100 absolute border px-3 py-1 top-6 left-0 rounded-tr-md rounded-br-md border-l-2 border-l-black">
                <p>${course.spaceLeft}/${course.spaceFull} Full</p>
                <span class="flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
            </div>
            <img src="${course.thumbnailUrl}" alt="${course.thumbnailUrl}" class="max-h-44 h-72">
            <h3 class="text-2xl font-light">${course.title}</h3>
            <p class="font-extralight text-slate-400">• ${course.subtitle} •</p>
            <h4 class="font-light text-slate-500 text-4xl">₹${number_format(course.price)}/-</h4>
            <ul class="list-none list-inside text-center"
                ${course.features.map(e => `<li>${e}</li>`).join('')}
            </ul>
            <div class="flex justify-center items-center">
                <button class="border px-4 py-2 bg-black text-white" ${!course.hasActive ? 'disabled' : ''} onclick="${course.hasActive ? `openRequestCallback('course', '${course._id}')` : `showSnackbar('Please dont hack me!')`}">Request</button>
                <a class="border px-4 py-2 bg-logoColor text-white" href="/scope.html?courseId=${course._id}" >Scope</a>
                <a class="border px-4 py-2 text-white ${!course.hasActive ? 'disabled' : ''}" href="/editor.html?lang=${course.keywords}" ><img src="/assets/code-editor-logo.svg" alt="/assets/code-editor-logo.svg" class="h-6 w-6"></a>
            </div>
        </div>
    `;
}