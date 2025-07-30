#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define lll __int128
#define ld long double

const ld eps = 1e-9;
const ld lim = 1e5;

// sign(x) return 0 if x == 0 , 1 if x > 0 , -1 if x < 0
inline int sign(ld x) {return (x > eps) - (x < -eps);}
inline int sign(__int128 x) {return (x > 0) - (x < 0);}
inline int sign(long long x) {return (x > 0) - (x < 0);}

#define point vector<ll>

point operator - (point a, point b) {
	point c = a;
	for (int i = 0, n = a.size(); i < n; i++)c[i] -= b[i];
	return c;
}
// vector dot product
ll operator | (point a, point b) {
	ll s = 0;
	for (int i = 0, n = a.size(); i < n; i++)s += a[i] * b[i];
	return s;
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	cout << setprecision(8) << fixed;
	int t, n; cin >> t; while (t--) {
		ll r1, r2; cin >> n >> r1 >> r2;
		point c1(n), c2(n), v1(n), v2(n);
		for (auto &x : c1)cin >> x;
		for (auto &x : c2)cin >> x;
		for (auto &x : v1)cin >> x;
		for (auto &x : v2)cin >> x;
		point C = c1 - c2, v = v1 - v2;
		ll r = r1 - r2, a = v | v, b = 2 * (C | v), c = (C | C) - r * r;
		lll d = (lll)b * b - (lll)4 * a * c;
		if (sign(d) < 0 || sign(r1 - r2) == 0)cout << -1 << '\n';
		else {
			if (sign(a) == 0) {
				if (sign(-c) >= 0)cout << 0.0 << '\n';
				else cout << -1 << '\n';
			} else {
				ld x1 = (-b - sqrtl((ld)d)) / 2.0 / a;
				ld x2 = (-b + sqrtl((ld)d)) / 2.0 / a;
				if (sign(x1) >= 0 && sign(x1 - lim) <= 0)cout << x1 << '\n';
				else if (sign(x1) < 0 && sign(x2) >= 0)cout << 0.0 << '\n';
				else cout << -1 << '\n';
			}
		}
	}
}