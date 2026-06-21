#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const ll mod = 1000000007;

ll power(ll a, ll p) {
    ll r = 1;
    for (; p; p >>= 1, a = a * a % mod)
        if (p & 1) r = r * a % mod;
    return r;
}

ll lagrange(vector<ll> &y, ll x) {
    int n = y.size() - 1;
    if (x <= n) return y[x];
    x %= mod;

    vector<ll> pre(n + 2, 1), suf(n + 2, 1), f(n + 1), invf(n + 1);
    for (int i = 0; i <= n; i++) pre[i + 1] = pre[i] * (x - i + mod) % mod;
    for (int i = n; i >= 0; i--) suf[i] = suf[i + 1] * (x - i + mod) % mod;

    f[0] = 1;
    for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % mod;
    invf[n] = power(f[n], mod - 2);
    for (int i = n; i; i--) invf[i - 1] = invf[i] * i % mod;

    ll ans = 0;
    for (int i = 0; i <= n; i++) {
        ll now = y[i] * pre[i] % mod * suf[i + 1] % mod * invf[i] % mod * invf[n - i] % mod;
        ans = ((n - i) & 1) ? (ans - now + mod) % mod : (ans + now) % mod;
    }
    return ans;
}

int32_t main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    ll n;
    int k;
    cin >> n >> k;

    vector<ll> s(k + 1), y(k + 1);
    s[0] = 1;
    for (int i = 1; i <= k; i++) {
        for (int j = i; j; j--) s[j] = (s[j - 1] + s[j] * j) % mod;
        s[0] = 0;
    }

    ll inv2 = (mod + 1) / 2;
    for (int i = 0; i <= k; i++) {
        ll fall = 1, p = 1;
        for (int j = 1; j <= i; j++) {
            fall = fall * (i - j + 1) % mod;
            p = p * inv2 % mod;
            y[i] = (y[i] + s[j] * fall % mod * p) % mod;
        }
    }

    cout << power(2, n) * lagrange(y, n) % mod << '\n';
}
