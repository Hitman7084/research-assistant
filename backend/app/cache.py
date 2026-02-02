from datetime import datetime, timedelta

_cache = {}

def get_cached(category: str):
    entry = _cache.get(category)
    if not entry:
        return None
    
    if datetime.now() > entry["expires_at"]:
        del _cache[category]
        return None
    
    return entry["data"]

def set_cache(category: str, data, ttl_hours: int = 6):
    _cache[category] = {
        "data": data,
        "expires_at": datetime.now() + timedelta(hours=ttl_hours)
    }

def clear_cache():
    _cache.clear()
