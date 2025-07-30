#include <bits/stdc++.h>
using namespace std;

const int mx = 1002;
int a[mx];
tuple<int, int, int> b[mx * mx];
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int n; while(cin >> n && n) {
		int m = 0;
		for(int i = 0; i < n; i++) {
			cin >> a[i];
			for(int j = 0; j < i; j++) {
				b[m++] = {a[i] + a[j], j, i};
			}
		}
		sort(b, b + m);
		int ma = INT_MIN;
		for(int i = 0; i < n; i++) {
			for(int j = 0; j < n; j++) {
				if(i == j) continue;
				int ind = upper_bound(b, b + m, make_tuple(a[i] - a[j], j, n + 1)) - b;
				for(int I = 0; I < 4 && ind + I < m; I++) {
					if(get<0>(b[ind + I]) == a[i] - a[j] && get<1>(b[ind + I]) != i && get<2>(b[ind + I]) != i) {
						ma = max(ma, a[i]);
					}
				}
			}
		}
		if(ma == INT_MIN) {
			cout << "no solution\n";
		} else {
			cout << ma << '\n';
		}
	}
	return 0;
}