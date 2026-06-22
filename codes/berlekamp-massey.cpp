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

vector<ll> berlekamp_massey(vector<ll> s) {
    vector<ll> C{1}, B{1};
    ll b = 1;
    int L = 0, m = 1;
    for (int n = 0; n < (int)s.size(); n++) {
        ll d = 0;
        for (int i = 0; i <= L; i++) d = (d + C[i] * s[n - i]) % mod;
        if (!d) {
            m++;
            continue;
        }
        vector<ll> T = C;
        ll x = d * power(b, mod - 2) % mod;
        if (C.size() < B.size() + m) C.resize(B.size() + m);
        for (int i = 0; i < (int)B.size(); i++)
            C[i + m] = (C[i + m] - x * B[i] % mod + mod) % mod;
        if (2 * L <= n) L = n + 1 - L, B = T, b = d, m = 1;
        else m++;
    }
    C.resize(L + 1);
    vector<ll> r(L);
    for (int i = 1; i <= L; i++) r[i - 1] = (mod - C[i]) % mod;
    return r;
}

vector<ll> combine(vector<ll> a, vector<ll> b, vector<ll> c) {
    int n = c.size();
    vector<ll> r(2 * n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            r[i + j] = (r[i + j] + a[i] * b[j]) % mod;
    for (int i = 2 * n - 2; i >= n; i--)
        for (int j = 1; j <= n; j++)
            r[i - j] = (r[i - j] + r[i] * c[j - 1]) % mod;
    r.resize(n);
    return r;
}

ll linear_rec(vector<ll> s, ll k) {
    vector<ll> c = berlekamp_massey(s);
    int n = c.size();
    if (k < (int)s.size()) return s[k] % mod;
    if (!n) return 0;
    s.resize(n);
    vector<ll> a(n), x(n);
    a[0] = 1;
    n == 1 ? x[0] = c[0] : x[1] = 1;
    for (; k; k >>= 1, x = combine(x, x, c))
        if (k & 1) a = combine(a, x, c);
    ll ans = 0;
    for (int i = 0; i < n; i++) ans = (ans + a[i] * s[i]) % mod;
    return ans;
}

int32_t main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int m;
    ll k;
    cin >> m >> k;
    vector<ll> s(m);
    for (ll &x : s) cin >> x, x = (x % mod + mod) % mod;
    cout << linear_rec(s, k) << '\n';
}
