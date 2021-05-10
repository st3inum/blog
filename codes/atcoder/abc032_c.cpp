#include <bits/stdc++.h>
using namespace std;

const int mx = 1e5 + 5;
int a[mx], n, k;
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	cin >> n >> k;
	for (int i = 0; i < n; i++) {
		cin >> a[i];
		if (a[i] == 0) {
			cout << n << '\n';
			return 0;
		}
	}
	int ma = 0;
	for (int l = 0, v = 1, r = 0; l < n; l++) {
		for (r = max(r, l); r < n && v <= k / a[r]; v *= a[r], r++) {
			ma = max(ma, r - l + 1);
		} if (v >= a[l])v /= a[l];
	}
	cout << ma << '\n';
}