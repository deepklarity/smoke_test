#!/usr/bin/env bash
set -o pipefail
claude -p 'Working directory: /Users/d/work/tmp/temp_hk_testing_folder/smoke3/.odin/worktrees/sp_20260327_173820_qwen_smoke/41

## Previous Review Feedback
[FAIL] (claude/claude-sonnet-4-5-20250929): **Reflection: FAIL**

Task failed due to Qwen API quota exhaustion, preventing any implementation work from being attempted; requires reassignment to different agent/model.

## Previous Execution Output
Completed in 40.6s

Completed successfully

---

Create `smoke_output/qwen.html` — a single self-contained HTML page with:
- A heading "Qwen Smoke Test"
- A styled data table with 4 columns (Name, Role, Score, Notes) and 3 rows of fictional data
- Inline CSS with a blue color theme (blue header, alternating row shading, etc.)

Ensure the `smoke_output/` directory is created if it doesn'"'"'t exist.

Proof: Open the file in a browser or inspect the HTML to verify it contains the heading, a well-structured 4-column table with 3 data rows, and blue-themed inline CSS styling.

## TaskIt MCP Tools

You have access to TaskIt MCP tools for communicating with the task board.
Your task ID is: 41

You MUST follow this exact sequence — no steps may be skipped:

1. **Start**: call `taskit_add_comment` with comment_type="status_update" — what you'"'"'re about to do
2. **Do your work** (write code, create files, etc.)
3. **Build & verify**: run the project'"'"'s build command (e.g. `npm run build`, `python -m py_compile`, `cargo build`) and confirm it succeeds with zero errors. If the build fails, fix the errors before proceeding. A task is NOT done until the build passes.
4. **Proof**: call `taskit_add_comment` with comment_type="proof" and include:
   - `file_paths`: list every file you created or modified
   - A text summary describing what you did and how to verify it
   - The build command you ran and its result (pass/fail)
   THIS IS THE COMPLETION SIGNAL — a task without proof is incomplete and will be marked failed.
5. Then output the ODIN-STATUS block below.

If you are blocked and need human input, call `taskit_add_comment` with comment_type="question" — this pauses until a human replies.

DO NOT post a separate "completed" status_update. The proof comment IS your completion message.
DO NOT skip step 3. You must call taskit_add_comment with comment_type="proof" before outputting ODIN-STATUS.


## Chrome DevTools MCP — Visual Proof

You have access to browser automation via chrome-devtools-mcp (page navigation, screenshots, DOM inspection, network monitoring, etc.).

**When your task creates or modifies anything that can be viewed in a browser**, you MUST capture a screenshot as part of your proof:

1. Open the page — use `navigate_page` with the appropriate URL:
   - Static HTML files: `file:///absolute/path/to/file.html`
   - Dev server / web app: `http://localhost:<port>/relevant/path`
   - Already-deployed page: the URL provided in the task description
2. Verify the page loaded: call `take_snapshot()` and confirm meaningful content is present (not a blank page or error screen).
3. Capture the screenshot: `take_screenshot(filePath="/tmp/proof_{task_id}.png")`
4. **Verify the file exists**: Run `ls -la /tmp/proof_{task_id}.png` and confirm it shows a non-zero file size. If the file is missing or empty, re-attempt the screenshot once. If it still fails, note this in your proof.
5. Include it in your proof: `taskit_add_comment(comment_type="proof", screenshot_paths=["/tmp/proof_{task_id}.png"], ...)`
6. **Check the result**: The tool returns a `screenshots_attached` count. If it is 0 despite providing paths, note the warning in a follow-up status_update.

**If the screenshot step fails** (browser not reachable, page errors), submit text-only proof with a note explaining what you tried and why it failed.

**Non-visual tasks** (pure logic, config, backend-only code with no UI) do NOT require screenshots — text-only proof is fine.


## Mobile MCP Tools

You have access to mobile device automation via mobile-mcp.

**CRITICAL — Do NOT start dev servers.** Never run `expo start`, `npm start`, `npm run dev`, `npx react-native start`, or any similar command. The human manages the dev server. If the app is not running or not responding on the device, ask the human via `taskit_add_comment(comment_type="question")`.

**Before interacting with a mobile device:**
1. Call `mobile_list_available_devices` to discover running emulators/simulators
2. If no devices found, ask the human via `taskit_add_comment(comment_type="question")`

**The app is already running on a device/emulator** — the human manages the dev server. Your code changes trigger hot-reload automatically.

**Proof sequence — ALL steps are MANDATORY. You must attempt every step in order.**
1. Do your work (write code, create files, etc.)
2. **Build gate — MANDATORY before any device interaction.** Run the project'"'"'s build or typecheck command and confirm zero errors. Check `package.json` scripts, `tsconfig.json`, `Makefile`, or equivalent to find the right command (e.g. `npx tsc --noEmit`, `npm run build`, `python -m py_compile`).
   - If the build fails, **fix the errors and re-run until it passes**. Do NOT proceed to device steps with a broken build — the dev server will crash and screenshots will fail.
   - After the build passes, verify the dev server is responsive by checking the port it runs on (look at the project'"'"'s dev script or running processes): `curl -sf http://localhost:<port> > /dev/null && echo "OK" || echo "DEV SERVER DOWN"`. If the server is down, wait 5 seconds and retry once. If still down, ask the human via `taskit_add_comment(comment_type="question")`.
3. **Runtime error check — MANDATORY after build gate passes.** Your code changes hot-reload automatically. Check for runtime crashes on the device:
   - **Android:** `adb logcat -d -s ReactNativeJS:E ReactNative:E | tail -50`
   - **iOS:** `xcrun simctl spawn booted log show --predicate '"'"'messageType == error'"'"' --last 2m --style compact 2>/dev/null | grep -iE '"'"'react|expo|fatal|exception'"'"'`
   - If errors appear (NullPointerException, missing exports, red screen crashes, module resolution failures), **fix them and re-check until the log is clean**. Do NOT proceed with a crashing app — screenshots of a crash screen are not proof of work.
   - Document each error you found and fixed in your proof comment (step 8). This is valuable evidence.
4. Call `mobile_list_available_devices` to find a device. You MUST call this — do not skip to text-only proof.
5. Launch the app on the device. **Important — Expo/React Native apps run inside Expo Go (`host.exp.exponent`), NOT as standalone APKs.** Do NOT guess a package name. Instead: call `mobile_launch_app(device="<device_id>", packageName="host.exp.exponent")` to open Expo Go, then use `mobile_open_url(device="<device_id>", url="exp://localhost:8081")` to load the project.
6. **Navigate to the screen or flow YOU built in this task** using mobile tools (`mobile_click_on_screen_at_coordinates`, `mobile_swipe_on_screen`, `mobile_type_keys`, etc.). Your screenshot must show YOUR work — not the home screen or a screen built by a previous task. If your task added a Team Setup screen, navigate to Team Setup. If your task built the Round Play flow, navigate through the gate screen into a round. The screenshot is proof that your specific deliverable works on device.
7. Save screenshot: `mobile_save_screenshot(device="<device_id>", saveTo="/tmp/proof_{task_id}.png")`. Take multiple screenshots if your task delivers a multi-step flow (e.g., gate → play → round end). Name them `/tmp/proof_{task_id}_1.png`, `/tmp/proof_{task_id}_2.png`, etc.
8. Submit proof with screenshot: `taskit_add_comment(comment_type="proof", file_paths=[...], screenshot_paths=["/tmp/proof_{task_id}.png"])`
   - Include in the proof summary: files changed, build result, runtime errors found and fixed (if any), and **what each screenshot shows and why it proves your task is complete**.

**If any step 4-7 fails** (no device, app won'"'"'t load, screenshot is blank/loading), you MUST still submit proof in step 8 — but as text-only:
`taskit_add_comment(comment_type="proof", file_paths=[...])` with a note explaining: "Screenshot unavailable — [what you tried and why it failed]. Verify manually on device."

**RULES:**
- You MUST pass the build gate (step 2) AND runtime error check (step 3) before ANY device interaction. A broken build or crashing app = wasted screenshots.
- If you find and fix runtime errors during step 3, that is part of your work — document what was broken and how you fixed it in proof.
- You MUST attempt mobile verification (steps 4-7). Skipping straight to text-only proof is NOT allowed.
- You MUST submit proof (step 8) no matter what. A task without proof WILL be marked failed.
- Text-only proof is acceptable ONLY after a genuine attempt at screenshot capture failed.
- NEVER exit without calling `taskit_add_comment(comment_type="proof")`. No exception.
- NEVER guess package names for Expo/React Native apps. Always use `host.exp.exponent` + `mobile_open_url`.


IMPORTANT — After completing your work, you MUST end your response with a status
block in exactly this format (including the separator lines):

-------ODIN-STATUS-------
SUCCESS or FAILED
-------ODIN-SUMMARY-------
<1-2 sentence summary of what was accomplished or what went wrong>' --output-format stream-json --verbose --model claude-sonnet-4-5 --mcp-config /Users/d/work/tmp/temp_hk_testing_folder/smoke3/.odin/worktrees/sp_20260327_173820_qwen_smoke/41/.odin/logs/mcp_41.json --allowedTools mcp__taskit__taskit_add_attachment,mcp__taskit__taskit_add_comment,mcp__mobile__mobile_click_on_screen_at_coordinates,mcp__mobile__mobile_drag_on_screen,mcp__mobile__mobile_find_and_click_element,mcp__mobile__mobile_get_element_tree,mcp__mobile__mobile_get_screen_size,mcp__mobile__mobile_install_app,mcp__mobile__mobile_launch_app,mcp__mobile__mobile_list_available_devices,mcp__mobile__mobile_long_press_on_screen_at_coordinates,mcp__mobile__mobile_navigate_back,mcp__mobile__mobile_open_url,mcp__mobile__mobile_save_screenshot,mcp__mobile__mobile_scroll_down,mcp__mobile__mobile_scroll_up,mcp__mobile__mobile_set_screen_brightness,mcp__mobile__mobile_swipe_on_screen,mcp__mobile__mobile_terminate_app,mcp__mobile__mobile_type_keys,mcp__mobile__mobile_wait,mcp__chrome-devtools__click,mcp__chrome-devtools__close_page,mcp__chrome-devtools__drag,mcp__chrome-devtools__emulate,mcp__chrome-devtools__evaluate_script,mcp__chrome-devtools__fill,mcp__chrome-devtools__fill_form,mcp__chrome-devtools__get_console_message,mcp__chrome-devtools__get_network_request,mcp__chrome-devtools__handle_dialog,mcp__chrome-devtools__hover,mcp__chrome-devtools__list_console_messages,mcp__chrome-devtools__list_network_requests,mcp__chrome-devtools__list_pages,mcp__chrome-devtools__navigate_page,mcp__chrome-devtools__new_page,mcp__chrome-devtools__performance_analyze_insight,mcp__chrome-devtools__performance_start_trace,mcp__chrome-devtools__performance_stop_trace,mcp__chrome-devtools__press_key,mcp__chrome-devtools__resize_page,mcp__chrome-devtools__select_page,mcp__chrome-devtools__take_memory_snapshot,mcp__chrome-devtools__take_screenshot,mcp__chrome-devtools__take_snapshot,mcp__chrome-devtools__type_text,mcp__chrome-devtools__upload_file,mcp__chrome-devtools__wait_for 2>&1 | tee /Users/d/work/tmp/temp_hk_testing_folder/smoke3/.odin/worktrees/sp_20260327_173820_qwen_smoke/41/.odin/logs/task_41.out
echo $? > /Users/d/work/tmp/temp_hk_testing_folder/smoke3/.odin/worktrees/sp_20260327_173820_qwen_smoke/41/.odin/logs/task_41.out.exit
